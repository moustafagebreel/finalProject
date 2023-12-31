import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/shared/models/User.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _redirectUrl: string = "/";
	private _loginUrl: string = '/accounts/login';
	private baseURL = environment.apiUrl + 'auth';

	constructor(
		private http: HttpClient,
		private tokenService: TokenService) {

	}

	login(credentials) {
		return this.http.post(`${this.baseURL}/login`, credentials)
	}

	signup(user: User) {
		return this.http.post(`${this.baseURL}/signup`, user)
	}

	logout() {
		let headers = this.setHeaders();
		return this.http.post(`${this.baseURL}/logout`, null, { headers: headers })
	}

	getAuthUser(): Observable<User> {
		let headers = this.setHeaders();
		return this.http.post<User>(`${this.baseURL}/me`, null, { headers: headers })
	}

	public setHeaders(): HttpHeaders {
		const headersConfig = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + this.tokenService.getToken()
		};
		return new HttpHeaders(headersConfig);
	}

	get loginUrl(): string {
		return this._loginUrl;
	}

	get redirectUrl(): string {
		return this._redirectUrl;
	}

	set redirectUrl(url: string) {
		this._redirectUrl = url;
	}

}
