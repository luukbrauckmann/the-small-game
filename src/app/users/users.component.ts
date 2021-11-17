import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
	home: MenuItem = { label: 'Gebruikers', routerLink: '/gebruikers' };
	get breadcrumbs() { return this.service.breadcrumbs };

  constructor(
		private service: UsersService
	) {}

}
