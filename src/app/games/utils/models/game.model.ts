import { IPlayer } from "../interfaces/player.interface";

export class Game {
	id: string = '';
	label: string = 'Nieuwe game';
	type: string = 'cash';
	buyIn: number = 10;
	date: Date | any = new Date();
	players: IPlayer[] = [];
	maxPlayers: number = 10;
	status: 'planned' | 'sending' | 'definite' | 'archived' = 'planned';

	constructor(input: Game | undefined = undefined) {
		if (input) {
			if (input.id) this.id = input.id;
			if (input.label) this.label = input.label;
			if (input.type) this.type = input.type;
			if (input.buyIn) this.buyIn = input.buyIn;
			if (input.date) this.date = input.date instanceof Date ? input.date : input.date.toDate();
			if (input.players) this.players = input.players;
			if (input.maxPlayers) this.maxPlayers = input.maxPlayers;
			if (input.status) this.status = input.status;
		}
		return this;
	}
}
