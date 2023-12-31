import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';
import { AuthService } from '../../../shared/services/auth.service';
import { TokenService } from '../../../shared/services/token.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	user: User = {
		name: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: "",
		address: "",
		number: "",
		dob: "",
	}

	verifypassword: string;
	startDate = new Date(1985, 0, 1);
	minDate = new Date(1900, 0, 1);
	maxDate = new Date(Date.now());
	isSubmitted: boolean = false;
	hasError: boolean = false;
	errorMessage: string = "Something's wrong";

	constructor(
		private authService: AuthService,
		private tokenService: TokenService,
		private router: Router,
		private changeDetector: ChangeDetectorRef
	) { }

	ngOnInit() {
	}

	onSubmit() {
		this.isSubmitted = true;
		this.authService.signup(this.user).subscribe(
			res => this.handleResponse(res),
			err => this.handleError(err.error)
		)
	}

	handleResponse(res) {
		this.hasError = false;
		this.tokenService.setToken(res.access_token);
		this.router.navigate([this.authService.redirectUrl]);
	}

	handleError(err) {
		this.isSubmitted = false;
		console.log(err)
		this.errorMessage = err.error ? err.message : 'Something\'s wrong. Try later.';
		this.hasError = true;
	}

	closeAlert() {
		this.hasError = false;
	}

	changeVerifyPassword() {
		this.verifypassword = this.user.password;
		this.changeDetector.detectChanges();
	}


}
