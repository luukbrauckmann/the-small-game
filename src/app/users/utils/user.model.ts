export class User {
	uid: string = '';
	displayName: string = '';
	firstName: string = '';
	lastName: string = '';
	alias: string = 'Fish';
	email: string = '';
	roles: string[] = [];
	status: 'active' | 'inactive' | 'new' | 'banned' = 'new';

	constructor(input: User | undefined = undefined) {
		if (input) {
			this.uid = input.uid ? input.uid : '';
			this.displayName = input.displayName ? input.displayName : '';
			this.firstName = input.firstName ? input.firstName : '';
			this.lastName = input.lastName ? input.lastName : '';
			this.alias = input.alias ? input.alias : 'Fish';
			this.email = input.email ? input.email : '';
			this.roles = input.roles ? input.roles : [];
			this.status = input.status ? input.status : 'new';
		}
	}
}
