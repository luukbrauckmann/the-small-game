import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from 'src/app/users/services/users.service';
import { User } from 'src/app/users/utils/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private _user$: Observable<User | undefined> = of(undefined);
	private _user: User | undefined = undefined;

	constructor(
		private afa: AngularFireAuth,
		private afs: AngularFirestore,
		private usersService: UsersService,
		private router: Router
	) {
		if (localStorage.getItem('the-small-game-user')) {
			const item = JSON.parse(localStorage.getItem('the-small-game-user') || '');
			this.user = new User(item);
		}
		this.user$ = afa.authState.pipe(
			switchMap((user: any) => {
				if (user) {
					console.log(user);

					return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
				} else {
					this.signOut();
					return of(undefined)
				}
			})
		);
		this.user$.subscribe((user: User | undefined) => {
			this.user = user;
			if (this.user) {
				localStorage.setItem('the-small-game-user', JSON.stringify(this.user));
			} else {
				localStorage.removeItem('the-small-game-user');
			}
		});
	}

	get user$(): Observable<User | undefined> { return this._user$; }
	set user$(value: Observable<User | undefined>) { this._user$ = value; }

	get user(): User | undefined { return this._user; }
	set user(value: User | undefined) { this._user = value; }

	get isSignedIn(): boolean {
		return this.user ? true : false;
	}

	async signUp(email: string, password: string, user: User): Promise<any> {
		return await this.afa.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				if (res.user) {
					res.user.updateProfile({ displayName: user.displayName });
					user.uid = res.user.uid;
					this.usersService.createItem(user, user.uid);
					this.user = new User();
					this.router.navigate(['/']);
				}
			}).catch((error) => {
				window.alert(error.message);
			})
	}

	async signIn(email: string, password: string): Promise<any> {
		return await this.afa.signInWithEmailAndPassword(email, password)
			.then(async (res) => {
				this.user = new User();
				this.router.navigate(['/']);
			})
			.catch((error) => {
				window.alert(error.message)
			})
	}

	signOut() {
		this.afa.signOut();
		this.user = undefined;
		this.user$ = of(undefined);
		this.router.navigate(['/inloggen']);
	}

	hasOneOfRoles(allowedRoles: string[]): boolean {
		if (this.user) {
			for (const allowedRole of allowedRoles) {
				const hasRole = this.user.roles.find((userRole) => userRole === allowedRole);
				if (hasRole) return true;
			};
		};
		return false;
	}
}
