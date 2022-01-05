import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  registerNewUser(data:any){
    return this.httpClient.post<any>('register', data)
  }
  loginUser(data:any){
    return this.httpClient.post<any>('login', data)
  }
  // Get All Users
  getAllUsers(){
      return this.httpClient.get('profile')
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  // =========================================
  // Password Forgot  Handiling to send mail
  // =========================================
  forgetPassword(data:any){
    return this.httpClient.post('resetPass/forget',data)
  }
  // =============================
  // get token for password reset
  // =============================
  gettokenForReset(token: any){
    return this.httpClient.get('resetPass/reset'+token)
  }
  // ================
  // Change Password
  // ================
  changeUserPassword(token: any,data:any){
    return this.httpClient.post('resetPass/reset/:'+token ,data);
  }


}
