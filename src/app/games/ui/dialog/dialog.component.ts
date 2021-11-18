import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Game } from '../../utils/game.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
	item: Game = new Game();

  constructor(
		private ref: DynamicDialogRef,
		private config: DynamicDialogConfig
	) {
		if (config.data) {
			this.item = new Game(config.data);
		}
	}

	close(item: Game | undefined = undefined): void {
		this.ref.close(item);
	}

}
