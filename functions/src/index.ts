import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

export const sendInvitations = functions.https.onCall(async (data) => {
	const usersRef = db.collection('users').where('status', '==', 'active');
	await usersRef.get().then(async (items) => {
		const uids = items.docs.map((item: any) => item.data().uid);
		await db.collection('emails').add({
			toUids: uids,
			subject: 'Uitnodiging poker game',
			template: {
				name: 'invitation_template',
				data
			}
		});
	});
});

export const verifyUser = functions.auth.user().onCreate((user) => {
	admin.auth().updateUser(user.uid, { emailVerified: true })
});