export class User {
	uid: string = '';
	displayName: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	roles: string[] = [];
	status: string = 'new';
	// active, inactive, new, banned

	constructor(input: User | undefined = undefined) {
		if (input) {
			this.uid = input.uid ? input.uid : '';
			this.displayName = input.displayName ? input.displayName : '';
			this.firstName = input.firstName ? input.firstName : '';
			this.lastName = input.lastName ? input.lastName : '';
			this.email = input.email ? input.email : '';
			this.roles = input.roles ? input.roles : [];
			this.status = input.status ? input.status : 'new';
		}
	}
}
