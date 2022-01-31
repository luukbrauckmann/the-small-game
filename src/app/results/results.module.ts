import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../guards/authentication.guard';

const routes: Route[] = [
	{
		path: 'resultaten',
		component: ResultsComponent,
		canActivate: [AuthenticationGuard],
		data: {
			validation: 'authenticated'
		},
		children: [
			{ path: '', component: ListComponent },
			{ path: ':id', component: ItemComponent },
		]
	}
];

@NgModule({
  declarations: [
    ResultsComponent,
    ListComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
		RouterModule.forRoot(routes),
  ]
})
export class ResultsModule { }
