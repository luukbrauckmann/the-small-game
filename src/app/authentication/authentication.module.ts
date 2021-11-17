import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthenticationComponent } from './authentication.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthenticationService } from './services/authentication.service';

import { AuthenticationGuard } from '../guards/authentication.guard';

import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

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
		RouterModule.forRoot(routes),
		ReactiveFormsModule,
		CardModule,
		InputTextModule,
		PasswordModule,
		ButtonModule
  ],
	providers: [ AuthenticationService ]
})
export class AuthenticationModule { }
