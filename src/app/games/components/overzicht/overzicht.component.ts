import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.scss']
})
export class OverzichtComponent implements OnInit {
	get items() { return this.service.items; };

	get isAdmin() { return this.auth.hasOneOfRoles(['admin']); };

  constructor(
		private service: GamesService,
		private auth: AuthenticationService
	) { }

  ngOnInit(): void {
		this.getItems();
  }

	getItems(): void {
		this.service.getItems();
	}

}
