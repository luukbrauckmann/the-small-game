export class User {
	uid: string = '';
	displayName: string = '';
	firstName: string = '';
	lastName: string = '';
	nickName: string = 'Fish';
	email: string = '';
	roles: string[] = [];
	status: 'active' | 'inactive' | 'new' | 'banned' = 'new';

	constructor(input: User | undefined = undefined) {
		if (input) {
			this.uid = input.uid ? input.uid : '';
			this.displayName = input.displayName ? input.displayName : '';
			this.nickName = input.nickName ? input.nickName : 'Fish';
			this.firstName = input.firstName ? input.firstName : '';
			this.lastName = input.lastName ? input.lastName : '';
			this.email = input.email ? input.email : '';
			this.roles = input.roles ? input.roles : [];
			this.status = input.status ? input.status : 'new';
		}
	}
}
