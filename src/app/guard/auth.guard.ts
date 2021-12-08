import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServicesService } from '../services/Authserice/auth-services.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  redirectUrl:any;
  constructor(private authService: AuthServicesService,
    private router: Router) {}
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    
    if(this.authService.loggedIn()){
      return true
    }else{
      this.redirectUrl = state.url;
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
