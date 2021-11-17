import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GamesService } from './services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
	home: MenuItem = { label: 'Games', routerLink: '/games' };
	get breadcrumbs() { return this.service.breadcrumbs };

  constructor(private service: GamesService) { }

}
