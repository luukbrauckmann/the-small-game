import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { GamesService } from '../../services/games.service';
import { Game } from '../../utils/game.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
	id = this.activatedRoute.snapshot.paramMap.get('id');

	form: FormGroup = new FormGroup({
		id: new FormControl(''),
		label: new FormControl('', Validators.required),
		type: new FormControl('cashgame', Validators.required),
		buyIn: new FormControl(10, Validators.required),
		date: new FormControl(new Date, Validators.required)
	});

	gameTypes = [
		{ label: 'Cashgame', value: 'cashgame' },
		{ label: 'Tournament', value: 'tournament' }
	];

	minDate = new Date();

	get item() { return this.service.item; }
	set item(input) { this.service.item = input; }

	set breadcrumbs(input: MenuItem[] | undefined) { this.service.breadcrumbs = input; };

  constructor(
		private service: GamesService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) { }

  ngOnInit(): void {
		if (this.id !== 'nieuw') {
			this.getItem();
		}
  }

	ngOnDestroy(): void {
		this.service.breadcrumbs = undefined;
	}

	getItem(): void {
		if (this.id) this.service.getItem(this.id).subscribe((item) => {
			if (item) {
				this.item = new Game(item);
				this.form.patchValue(this.item);
				this.breadcrumbs = [{ label: this.item.label, routerLink: `/games/${this.item.id}` }];
			}
		});
	}

	submit(): void {
		const newItem = new Game(this.form.value);
		if (this.id !== 'nieuw') this.service.updateItem(newItem);
		else this.service.createItem(newItem);
		this.router.navigate(['/games']);
	}

}
