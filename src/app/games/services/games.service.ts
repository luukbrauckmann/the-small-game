import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../utils/game.model';
import { Observable, of } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends AppService {
	collection = 'games';

	private _breadcrumbs: MenuItem[] | undefined = undefined;
	get breadcrumbs(): MenuItem[] | undefined { return this._breadcrumbs; };
	set breadcrumbs(input: MenuItem[] | undefined) { this._breadcrumbs = input; };

	private _items: Observable<Game[]> = of([]);
	get items(): Observable<Game[]> { return this._items };
	set items(input: Observable<Game[]>) { this._items = input; };

	private _item: Game | undefined = undefined;
	get item(): Game | undefined { return this._item };
	set item(input: Game | undefined) { this._item = input; };

  constructor(afs: AngularFirestore) { super(afs); }

	createItem(item: Game): Promise<Game> {
		return super.create(item);
	}

	updateItem(item: Game): Promise<Game> {
		return super.update(item, item.id);
	}

	getItems(): void {
		const params = { query: (ref: any) => ref.orderBy('date', 'desc') };
		this.items = super.get(params);
	}

	getItem(id: string): Observable<any> {
		const params = { id };
		return super.get(params);
	}

}
