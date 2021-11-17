import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/users/utils/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
	form: FormGroup = new FormGroup({
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required)
	});

	constructor(
		private service: AuthenticationService
	) {}

  signUp(): void {
		if (this.form.valid) {
			const email = this.form.value.email;
			const password = this.form.value.password;
			const user = new User(this.form.value);
			user.displayName = `${user.firstName} ${user.lastName}`
			this.service.signUp(email, password, user);
		}
	}

}
