import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthenticationComponent } from './authentication.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { AuthenticationGuard } from '../guards/authentication.guard';

const routes: Routes = [
	{
		path: 'inloggen',
		component: SignInComponent ,
		canActivate: [ AuthenticationGuard ],
		data: {
			validation: 'notAuthenticated',
		}
	},
	{
		path: 'registreren',
		component: SignUpComponent ,
		canActivate: [ AuthenticationGuard ],
		data: {
			validation: 'notAuthenticated',
		}
	}
];

@NgModule({
  declarations: [
    AuthenticationComponent,
		SignUpComponent,
		SignInComponent
  ],
  imports: [
    CommonModule,
		RouterModule.forRoot(routes)
  ]
})
export class AuthenticationModule { }
