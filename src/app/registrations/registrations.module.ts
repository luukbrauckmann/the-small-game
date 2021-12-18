import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationsComponent } from './registrations.component';
import { OverzichtComponent } from './components/overzicht/overzicht.component';
import { DetailComponent } from './components/detail/detail.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
	{
		path: 'registraties',
		component: RegistrationsComponent,
		canActivate: [AuthenticationGuard],
		data: {
			validation: 'authenticated'
		},
		children: [
			{ path: '', component: OverzichtComponent },
			{ path: ':id', component: DetailComponent },
		]
	}
];

@NgModule({
  declarations: [
    RegistrationsComponent,
    OverzichtComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
		RouterModule.forRoot(routes)
  ]
})
export class RegistrationsModule { }
