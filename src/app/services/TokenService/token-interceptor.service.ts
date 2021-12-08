import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthServicesService } from '../Authserice/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor(private authService: AuthServicesService) { }

  intercept(req:any,next:any){
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
