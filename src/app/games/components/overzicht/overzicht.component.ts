import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { GamesService } from '../../services/games.service';
import { DialogComponent } from '../../ui/dialog/dialog.component';
import { Game } from '../../utils/models/game.model';

@Component({
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.scss']
})
export class OverzichtComponent implements OnInit {
	get items() { return this.service.items; };

	get isAdmin() { return this.auth.hasOneOfRoles(['admin']); };

  constructor(
		private service: GamesService,
		private auth: AuthenticationService,
		private dialogService: DialogService
	) { }

  ngOnInit(): void {
		this.getItems();
  }

	getItems(): void {
		this.service.getItems();
	}

	addItem(): void {
		const ref = this.dialogService.open(DialogComponent, { header: 'Nieuwe game', closable: false });
		ref.onClose.subscribe((item: Game) => {
			if (item) this.service.createItem(item);
		});
	}

	editItem(item: Game): void {
		const ref = this.dialogService.open(DialogComponent, { header: item.label, closable: false, data: item });
		ref.onClose.subscribe((item: Game) => {
			if (item) this.service.updateItem(item);
		});
	}

}
