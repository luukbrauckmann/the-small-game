import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { OverzichtComponent } from './components/overzicht/overzicht.component';
import { DetailComponent } from './components/detail/detail.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { Route, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';

const routes: Route[] = [
	{
		path: 'gebruikers',
		component: UsersComponent,
		canActivate: [AuthenticationGuard],
		data: {
			validation: 'hasOneOfRoles',
			allowedRoles: ['admin']
		},
		children: [
			{ path: '', component: OverzichtComponent },
			{ path: ':id', component: DetailComponent },
		]
	}
];

@NgModule({
	declarations: [
		UsersComponent,
		OverzichtComponent,
		DetailComponent
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		TableModule,
		ButtonModule,
		ChipModule,
		BreadcrumbModule,
		CardModule
	]
})
export class UsersModule { }
