import { AngularFirestore } from "@angular/fire/compat/firestore";

export class Game {
	id: string = '';
	label: string = 'Nieuwe game';
	type: string = 'cashgame';
	buyIn: number = 10;
	date: Date | any = new Date();

	constructor(input: Game | undefined = undefined) {
		if (input) {
			this.id = input.id ? input.id : '';
			this.label = input.label ? input.label : '';
			this.type = input.type ? input.type : '';
			this.buyIn = input.buyIn ? input.buyIn : 10;
			if (input.date) {
				if (input.date instanceof Date) this.date = input.date;
				else this.date = input.date.toDate();
			}
		}
	}
}
