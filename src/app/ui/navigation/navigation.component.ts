import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { User } from 'src/app/users/utils/user.model';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
	@ViewChild('mainMenuSidebar') mainMenuSidebar: Sidebar | undefined;
	@ViewChild('userMenuSidebar') userMenuSidebar: Sidebar | undefined;

	displayMainMenu = false;
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
			{ icon: 'pi pi-home', label: 'Start', routerLink: '/', command: () => this.closeMainMenu(), visible: this.isSignedIn },
			{ icon: 'pi pi-users', label: 'Gebruikers', routerLink: '/gebruikers', command: () => this.closeMainMenu(), visible: this.auth.hasOneOfRoles(['admin']) },
			{ label: 'Games', routerLink: '/games', command: () => this.closeMainMenu(), visible: this.isSignedIn },
			{ label: 'Registraties', routerLink: '/registraties', command: () => this.closeMainMenu(), visible: this.isSignedIn }
		];
		this.userMenuItems = [
			{ label: 'Account', command: () => this.closeUserMenu() },
			{ label: 'Uitloggen', command: () => { this.closeUserMenu(); this.auth.signOut() } },
		];
	}

	signOut(): void {
		this.auth.signOut();
	}

	closeMainMenu(): void {
		this.mainMenuSidebar?.hide();
		this.displayMainMenu = false;
	}
	closeUserMenu(): void {
		this.userMenuSidebar?.hide();
		this.displayUserMenu = false;
	}

}
