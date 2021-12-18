import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../utils/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
	@Input() set patchValue(input: User) { this.form.patchValue(input); };
	@Output() submit: EventEmitter<User> = new EventEmitter();
	@Output() cancel: EventEmitter<void> = new EventEmitter();

	form: FormGroup = new FormGroup({
		uid: new FormControl(''),
		displayName: new FormControl(''),
		nickName: new FormControl(''),
		firstName: new FormControl(''),
		lastName: new FormControl(''),
		email: new FormControl(''),
		roles: new FormControl(''),
		status: new FormControl('')
	});

	roles = [
		{ label: 'Admin', value: 'admin' },
		{ label: 'Developer', value: 'dev' }
	];

	statuses = [
		{ label: 'Actief', value: 'active' },
		{ label: 'inactief', value: 'inactive' },
		{ label: 'Nieuw', value: 'new' },
		{ label: 'Geblokkeerd', value: 'banned' }
	];

	onSubmit(): void {
		const newItem = new User(this.form.value);
		this.submit.emit(newItem);
	}

	onCancel(): void {
		this.cancel.emit();
	}
}
