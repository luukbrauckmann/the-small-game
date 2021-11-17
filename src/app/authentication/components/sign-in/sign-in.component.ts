import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
	form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required)
	});

  constructor(
		private service: AuthenticationService
		) { }

	signIn(): void {
		if (this.form.valid) {
			const email = this.form.value.email;
			const password = this.form.value.password;
			this.service.signIn(email, password);
		}
	}
}
