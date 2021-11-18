import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MailsService } from 'src/app/mails/services/mails.service';
import { UsersService } from 'src/app/users/services/users.service';
import { GamesService } from '../../services/games.service';
import { Game } from '../../utils/game.model';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

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
		private mailsService: MailsService,
		private aff: AngularFireFunctions
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
			}
		});
	}

	sendInvitations(): void {
		console.log('Sending');
		const test = ['3WLpf1vS0zcGPfaqQg0o8tWELWs2'];
		// this.userService.getItems()
		const mail = this.getMail(test);
		const callable = this.aff.httpsCallable('sendInvitation');
		const data = callable(mail);
		data.subscribe((val) => console.log(val))

		// this.mailsService.createItem(mail);
	}

	getMail(uids: string[]): any {
		const mail = {
			toUids: uids,
			message: {
				subject: `Uitnodiging ${this.item.type} game.`,
				html: `
				<h1>Uitnodiging ${this.item.type} game.</h1>
				<p>Er is een nieuwe pokergame gepland.</p>
				<div style="
				box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
				padding: 1rem;
				border-radius: 3px;
				">
					<div style="margin-bottom: 1rem;">
						<h2 style="margin: 0px;">Details</h2>
					</div>

					<div style="
					display: flex;
					flex-wrap: wrap;
					margin-right: -0.5rem;
					margin-left: -0.5rem;
					margin-bottom: 1rem;
					">
						<div style="
						flex: 0 0 auto;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						width: 33.3333%;
						">
							Naam:
						</div>
						<div style="
						flex-grow: 1;
						flex-basis: 0;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						">
							${this.item.label}
						</div>
					</div>

					<div style="
					display: flex;
					flex-wrap: wrap;
					margin-right: -0.5rem;
					margin-left: -0.5rem;
					margin-bottom: 1rem;
					">
						<div style="
						flex: 0 0 auto;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						width: 33.3333%;
						">
							Type:
						</div>
						<div style="
						flex-grow: 1;
						flex-basis: 0;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						">
							${this.item.type}
						</div>
					</div>

					<div style="
					display: flex;
					flex-wrap: wrap;
					margin-right: -0.5rem;
					margin-left: -0.5rem;
					margin-bottom: 1rem;
					">
						<div style="
						flex: 0 0 auto;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						width: 33.3333%;
						">
							Buy-in:
						</div>
						<div style="
						flex-grow: 1;
						flex-basis: 0;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						">
							${this.item.buyIn}
						</div>
					</div>

					<div style="
					display: flex;
					flex-wrap: wrap;
					margin-right: -0.5rem;
					margin-left: -0.5rem;
					margin-bottom: 1rem;
					">
						<div style="
						flex: 0 0 auto;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						width: 33.3333%;
						">
							Datum & tijd:
						</div>
						<div style="
						flex-grow: 1;
						flex-basis: 0;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						">
							${this.item.date}
						</div>
					</div>

					<div style="
					display: flex;
					flex-wrap: wrap;
					margin-right: -0.5rem;
					margin-left: -0.5rem;
					margin-bottom: 1rem;
					">
						<div style="
						flex: 0 0 auto;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						width: 33.3333%;
						">
							Speler aantal:
						</div>
						<div style="
						flex-grow: 1;
						flex-basis: 0;
						padding: 0.5rem;
						padding-top: 0;
						padding-bottom: 0;
						">
							${this.item.maxPlayers}
						</div>
					</div>

					<div>
						<a href="https://thesmallgame.com/uitnodigingen/gameId">Uitnodiging accepteren</a>
					</div>
				</div>
				`,
			}
		};
		return mail;
	}

}
