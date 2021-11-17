import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { User } from 'src/app/users/utils/user.model';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
	displayUserMenu = false;

	private _navMenuItems: MenuItem[] = [];
	get navMenuItems(): MenuItem[] { return this._navMenuItems }
	set navMenuItems(value: MenuItem[]) { this._navMenuItems = value; }

	private _userMenuItems: MenuItem[] = [];
	get userMenuItems(): MenuItem[] { return this._userMenuItems }
	set userMenuItems(value: MenuItem[]) { this._userMenuItems = value; }

	get isSignedIn(): boolean { return this.auth.isSignedIn }
	get user(): User | undefined { return this.auth.user }

	constructor(private auth: AuthenticationService) {
		this.getMenuItems();
		this.auth.user$.subscribe(() => this.getMenuItems())
	}

	getMenuItems(): void {
		this.navMenuItems = [
			{ icon: 'pi pi-home', label: 'Start', routerLink: '/', visible: this.isSignedIn },
			{ label: 'Gebruikers', routerLink: '/gebruikers', visible: this.auth.hasOneOfRoles(['admin']) }
		];
		this.userMenuItems = [
			{ label: 'Account', command: () => { this.displayUserMenu = false; } },
			{ label: 'Uitloggen', command: () => { this.displayUserMenu = false; this.auth.signOut() } },
		];
	}

	signOut(): void {
		this.auth.signOut();
	}

}
