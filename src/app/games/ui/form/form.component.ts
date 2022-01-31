import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Game } from '../../utils/models/game.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
	@Input() set patchValue(input: Game) { this.form.patchValue(input); };
	@Output() submit: EventEmitter<Game> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	form: FormGroup = new FormGroup({
		id: new FormControl(''),
		label: new FormControl('', Validators.required),
		type: new FormControl('cash', Validators.required),
		buyIn: new FormControl(10, Validators.required),
		maxPlayers: new FormControl(10, Validators.required),
		date: new FormControl(new Date, Validators.required),
		inviteSend: new FormControl(false, Validators.required)
	});

	gameTypes = [
		{ label: 'Cashgame', value: 'cash' },
		{ label: 'Tournament', value: 'tournament' }
	];

	minDate = new Date();

	onSubmit(): void {
		const newItem = new Game(this.form.value);
		this.submit.emit(newItem);
	}

	onCancel(): void {
		this.cancel.emit();
	}

}
