import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AppService {
	abstract collection: string;

  constructor(
		protected afs: AngularFirestore
	) { }

	create(item: any, id?: string | undefined): Promise<any> {
		return this.afs.collection(this.collection).doc(id).set({...item});
	}

	update(item: any, id: string): Promise<any> {
		return this.afs.collection(this.collection).doc(id).update({...item});
	}

	delete(id: string): Promise<any> {
		return this.afs.collection(this.collection).doc(id).delete();
	}

	get(id?: string | undefined): Observable<any> {
		if (id) return this.afs.collection(this.collection).doc(id).valueChanges();
		else return this.afs.collection(this.collection).valueChanges();
	}
}
