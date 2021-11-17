import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';

interface Iparams {
	id?: string | undefined,
	query?: QueryFn<firebase.firestore.DocumentData> | undefined
}

@Injectable({
  providedIn: 'root'
})
export abstract class AppService {
	abstract collection: string;

  constructor(
		protected afs: AngularFirestore
	) { }

	create(item: any, id?: string | undefined): Promise<any> {
		if (!id) id = this.afs.createId();
		return this.afs.collection(this.collection).doc(id).set({...item, id});
	}

	update(item: any, id: string): Promise<any> {
		return this.afs.collection(this.collection).doc(id).update({...item});
	}

	delete(id: string): Promise<any> {
		return this.afs.collection(this.collection).doc(id).delete();
	}

	get(params: Iparams | undefined = undefined): Observable<any> {
		if (params && params.id) return this.afs.collection(this.collection).doc(params.id).valueChanges();
		else return this.afs.collection(this.collection, params?.query).valueChanges();
	}
}
