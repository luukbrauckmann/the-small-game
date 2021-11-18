import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppService } from 'src/app/services/app.service';
import { Mail } from '../utils/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailsService extends AppService {
	collection = 'mails';

  constructor(afs: AngularFirestore) { super(afs); }

	createItem(item: Mail): Promise<Mail> {
		return super.create(item);
	}
}
