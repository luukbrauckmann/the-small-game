import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuItem } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { User } from '../utils/user.model';

@Injectable({
	providedIn: 'root'
})
export class UsersService extends AppService {
	collection = 'users';

	private _breadcrumbs: MenuItem[] | undefined = undefined;
	get breadcrumbs(): MenuItem[] | undefined { return this._breadcrumbs; };
	set breadcrumbs(input: MenuItem[] | undefined) { this._breadcrumbs = input; };

	private _item: User | undefined = undefined;
	get item(): User | undefined { return this._item };
	set item(input: User | undefined) { this._item = input; };

	private _items: Observable<User[]> = of([]);
	get items(): Observable<User[]> { return this._items };
	set items(input: Observable<User[]>) { this._items = input; };

	constructor(afs: AngularFirestore) { super(afs); }

	getItems(): void {
		this.items = super.get();
	}

	getItem(id: string): void {
		super.get(id).subscribe((item) => {
			this.item = new User(item);
			this.breadcrumbs = [{ label: this.item.displayName, routerLink: `/gebruikers/${this.item.uid}` }];
		});
	}

	createItem(item: User, id: string): Promise<User> {
		return super.create(item, id);
	}

	updateItem(item: User): Promise<User> {
		return super.update(item, item.uid);
	}

	deleteItem(item: User): Promise<User> {
		return super.delete(item.uid);
	}
}
