import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../services/Authserice/auth-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthServicesService, public toaster: ToastrService) { }

  user:any;
  ngOnInit(): void {
    // this.getLoginUserData();
  }
  logoutUser(){
    this.authService.logoutUser();
    this.toaster.success(JSON.stringify(200), JSON.stringify("You are Logout Successfully.!"), {
      timeOut:4000,
      progressBar:true
    });
  }
  // getLoginUserData(){
  //   return this.authService.getAllUsers().subscribe(res => {
  //     this.user = res;
  //     console.log(this.user)
  //   })
  // }

  



}
