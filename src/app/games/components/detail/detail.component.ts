import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { GamesService } from '../../services/games.service';
import { Game } from '../../utils/models/game.model';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

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

	isAdmin: boolean = this.auth.hasOneOfRoles(['admin']);

	accepted = false;

	get item() { return this.service.item; }
	set item(input) { this.service.item = input; }

	set breadcrumbs(input: MenuItem[] | undefined) { this.service.breadcrumbs = input; };

	constructor(
		private service: GamesService,
		private activatedRoute: ActivatedRoute,
		private aff: AngularFireFunctions,
		private datePipe: DatePipe,
		private currencyPipe: CurrencyPipe,
		private auth: AuthenticationService
	) { }

	ngOnInit(): void {
		this.getItem();

	}

	ngOnDestroy(): void {
		this.service.breadcrumbs = undefined;
		this.service.itemSubscription.unsubscribe();
	}

	getItem(): void {
		if (this.id) this.service.itemSubscription = this.service.getItem(this.id).subscribe((item) => {
			if (item) {
				this.item = new Game(item);
				this.form.patchValue(this.item);
				this.breadcrumbs = [{ label: this.item.label, routerLink: `/games/${this.item.id}` }];
				const index = this.item.players.findIndex((item) => item.uid === this.auth.user?.uid);
				this.accepted = index >= 0;
			}
		});
	}

	sendInvitations(): void {
		this.item.status = 'sending';
		this.service.updateItem(this.item);
		const data: any = {...this.item};
		data.buyIn = this.currencyPipe.transform(data.buyIn, 'EUR');
		data.date = this.datePipe.transform(data.date, 'dd-MM-yyyy HH:mm');
		const callable = this.aff.httpsCallable('sendInvitations');
		callable(data).subscribe({
			next: (res) => {
				console.log(res);
				this.item.status = 'definite';
				this.service.updateItem(this.item);
			},
			error: (error) => {
				this.item.status = 'planned';
				this.service.updateItem(this.item);
			},
			complete: () => console.log('Completed')
		});
	}

	acceptInvitation() : void {
		const index = this.item.players.findIndex((item) => item.uid === this.auth.user?.uid);
		if (index < 0 && this.auth.user) {
			const name = `${this.auth.user.firstName.charAt(0)}. ${this.auth.user.lastName}`;
			const player = { uid: this.auth.user.uid, name, alias: this.auth.user.alias };
			this.item.players.push(player);
			this.service.updateItem(this.item)
			.then(() => this.accepted = true);
		}
	}
	declineInvitation() : void {
		const index = this.item.players.findIndex((item) => item.uid === this.auth.user?.uid);
		this.item.players.splice(index, 1);
		this.service.updateItem(this.item)
		.then(() => this.accepted = false);
	}
}
