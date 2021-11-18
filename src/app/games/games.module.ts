import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { OverzichtComponent } from './components/overzicht/overzicht.component';
import { DetailComponent } from './components/detail/detail.component';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { GamesService } from './services/games.service';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FormComponent } from './ui/form/form.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogComponent } from './ui/dialog/dialog.component';

const routes: Route[] = [
	{
		path: 'games',
		component: GamesComponent,
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
		GamesComponent,
		OverzichtComponent,
		DetailComponent,
		FormComponent,
  DialogComponent
	],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		BreadcrumbModule,
		CardModule,
		ReactiveFormsModule,
		InputTextModule,
		ButtonModule,
		DropdownModule,
		InputNumberModule,
		CalendarModule,
		TableModule,
		DynamicDialogModule
	],
	providers: [GamesService]
})
export class GamesModule { }
