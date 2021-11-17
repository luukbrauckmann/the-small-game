import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, Observable, of, take, tap } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

	constructor(
		private auth: AuthenticationService,
		private router: Router,
		private messageService: MessageService
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		switch (route.data['validation']) {
			case 'authenticated':
				return this.authenticated();
			case 'notAuthenticated':
				return this.notAuthenticated();
			case 'hasOneOfRoles':
				return this.hasOneOfRoles(route.data['allowedRoles']);
		}
		return false;
	}

	authenticated(): boolean {
		if (!this.auth.isSignedIn) {
			this.router.navigate(['/inloggen']);
			this.messageService.add({severity:'warn', summary: 'Let op!', detail: 'Je bent niet ingelogd.'});
		}
		return this.auth.isSignedIn;
	}

	notAuthenticated(): boolean {
		if (this.auth.isSignedIn) {
			this.router.navigate(['/']);
			this.messageService.add({severity:'info', summary: 'Info', detail: 'Je bent al ingelogd.'});
		}
		return !this.auth.isSignedIn;
	}

	hasOneOfRoles(allowedRoles: string[]): boolean {
		const hasRole = this.auth.hasOneOfRoles(allowedRoles);
		if (!hasRole) {
			this.messageService.add({severity:'warn', summary: 'Let op!', detail: 'Je hebt geen toegang.'});
		}
		return hasRole;
	}

}
