import { Injectable } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../utils/game.model';
import { Observable, of, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends AppService {
	collection = 'games';

	private _breadcrumbs: MenuItem[] | undefined = undefined;
	get breadcrumbs(): MenuItem[] | undefined { return this._breadcrumbs; };
	set breadcrumbs(input: MenuItem[] | undefined) { this._breadcrumbs = input; };

	private _items: Game[] = [];
	get items(): Game[] { return this._items };
	set items(input: Game[]) { this._items = input; };

	itemSubscription: Subscription = new Subscription();
	private _item: Game  = new Game();
	get item(): Game { return this._item };
	set item(input: Game) { this._item = input; };

  constructor(afs: AngularFirestore) { super(afs); }

	createItem(item: Game): Promise<Game> {
		return super.create(item);
	}

	updateItem(item: Game): Promise<Game> {
		return super.update(item, item.id);
	}

	getItems(): void {
		const params = { query: (ref: any) => ref.orderBy('date', 'desc') };
		super.get(params).subscribe({
			next: (res) => this.items = res
		});
	}

	getItem(id: string): Observable<any> {
		const params = { id };
		return super.get(params);
	}

}
