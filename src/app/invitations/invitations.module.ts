import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationsComponent } from './invitations.component';
import { OverzichtComponent } from './components/overzicht/overzicht.component';
import { DetailComponent } from './components/detail/detail.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { Route } from '@angular/router';

const routes: Route[] = [
	{
		path: 'uitnodigingen',
		component: InvitationsComponent,
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
    InvitationsComponent,
    OverzichtComponent,
    DetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InvitationsModule { }
