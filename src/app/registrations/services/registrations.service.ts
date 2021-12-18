import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Game } from 'src/app/games/utils/game.model';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService extends AppService {
	collection = 'registrations';

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

	getItem(gameId: string): Observable<any> {
		const params = {  };
		return super.get(params);
	}

	accept(item: any): void {
		if (this.item) super.update(item, item.id)
		else super.create(item)
	}

	decline(item: any): void {
		if (this.item) super.update(item, item.id)
		else super.create(item)
	}
}
