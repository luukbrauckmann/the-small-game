import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { CardModule } from 'primeng/card';

const routes: Route[] = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [ AuthenticationGuard ],
		data: {
			validation: 'authenticated',
		}
	}
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
		RouterModule.forRoot(routes),
		CardModule
  ]
})
export class HomeModule { }
