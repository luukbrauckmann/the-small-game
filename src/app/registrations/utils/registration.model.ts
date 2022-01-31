export class Registration {
	id: string = '';
	userId: string = '';
	userName: string = '';
	userAlias: string = '';
	gameId: string = '';

	constructor(input: Registration | undefined = undefined) {
		if (input) {
			if (input.id) this.id = input.id;
			if (input.userName) this.userName = input.userName;
			if (input.userAlias) this.userAlias = input.userAlias;
			if (input.gameId) this.gameId = input.gameId;
		}
		return this;
	}
}
