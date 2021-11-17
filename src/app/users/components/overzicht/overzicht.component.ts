import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { User } from '../../utils/user.model';
import { deleteUser } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
	selector: 'app-overzicht',
	templateUrl: './overzicht.component.html',
	styleUrls: ['./overzicht.component.scss']
})
export class OverzichtComponent implements OnInit {
	get items(): Observable<User[]> { return this.service.items; }

	constructor(
		private service: UsersService,
		private afa: AngularFireAuth
	) { }

	ngOnInit(): void {
		this.getItems();
	}

	getItems(): void {
		this.service.getItems();
	}

	acceptUser(item: User): void {
		item.status = 'active';
		this.service.updateItem(item);
	}

	declineUser(item: User): void {
		this.service.deleteItem(item);
	}

}
