import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService, 
    private authService: AuthService, 
    private router: Router){}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    
    if(this.tokenService.isLoggedIn.value){
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate([this.authService.loginUrl]);
	  return false;
  }
  
}
