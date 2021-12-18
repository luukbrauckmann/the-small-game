import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { User } from '../../utils/user.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
	item: User = new User();

  constructor(
		private ref: DynamicDialogRef,
		private config: DynamicDialogConfig
	) {
		if (config.data) {
			this.item = new User(config.data);
		}
	}

	close(item: User | undefined = undefined): void {
		this.ref.close(item);
	}
}
