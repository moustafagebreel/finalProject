import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate, CanActivateChild {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ){}

  canActivate(){
    if(this.tokenService.isLoggedIn.value){
      this.router.navigate([this.authService.redirectUrl])
      return false;
    }
    return true;
  }

  canActivateChild(){
    if(this.tokenService.isLoggedIn.value){
      this.router.navigate([this.authService.redirectUrl])
      return false;
    }
    return true;
  }
  
}
