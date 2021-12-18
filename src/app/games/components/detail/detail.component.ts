import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MailsService } from 'src/app/mails/services/mails.service';
import { UsersService } from 'src/app/users/services/users.service';
import { GamesService } from '../../services/games.service';
import { Game } from '../../utils/game.model';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { RegistrationsService } from 'src/app/registrations/services/registrations.service';

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

	get item() { return this.service.item; }
	set item(input) { this.service.item = input; }

	set breadcrumbs(input: MenuItem[] | undefined) { this.service.breadcrumbs = input; };

	constructor(
		private service: GamesService,
		private activatedRoute: ActivatedRoute,
		private aff: AngularFireFunctions,
		private datePipe: DatePipe,
		private currencyPipe: CurrencyPipe,
		private auth: AuthenticationService,
		private registrationService: RegistrationsService
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
		const data: any = {...this.item};
		data.buyIn = this.currencyPipe.transform(data.buyIn, 'EUR');
		data.date = this.datePipe.transform(data.date, 'dd-MM-yyyy HH:mm');
		const callable = this.aff.httpsCallable('sendInvitations');
		callable(data).subscribe({
			next: (res) => console.log(res),
			error: (error) => console.log(error),
			complete: () => console.log('Completed')
		});
	}

	acceptInvitation() : void {
		this.registrationService.accept(this.item.id);
	}
	declineInvitation() : void {
		this.registrationService.decline(this.item.id);
	}
}
