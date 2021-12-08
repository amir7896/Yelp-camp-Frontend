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
    return this.httpClient.post<any>('http://localhost:3000/register', data)
  }
  loginUser(data:any){
    return this.httpClient.post<any>('http://localhost:3000/login', data)
  }
  // Get All Users
  getAllUsers(){
      return this.httpClient.get('http://localhost:3000/profile')
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


}
