import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

export const sendInvitation = functions.https.onCall(async (data) => {
	const usersRef = db.collection('users').where('status', '==', 'active');
	await usersRef.get().then(async (items) => {
		const uids = items.docs.map((item: any) => item.data().uid);
		await db.collection('mails').add({
			toUids: uids,
			message: {
				subject: 'Hello from The Small Game!',
				text: 'This is the plaintext section of the email body.',
				html: 'This is the <code>HTML</code> section of the email body.',
			},
		});
	});
});

export const verifyUser = functions.auth.user().onCreate((user) => {
	admin.auth().updateUser(user.uid, { emailVerified: true })
});