import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthServicesService} from 'src/app/services/Authserice/auth-services.service';
import { AuthGuard } from 'src/app/guard/auth.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form! : FormGroup;
  submitted =false;
  data: any;
  //Previous Url Where User Want to request the page without login
  previousUrl:any;

  constructor(private authService: AuthServicesService,
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    private router: Router,
    private authGuard: AuthGuard) { }

    creatForm(){
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  ngOnInit(): void {
    this.creatForm();
    if(this.authGuard.redirectUrl){
      this.toastr.info(JSON.stringify('Information'),JSON.stringify("You Must Be Login"),{
        timeOut: 4000,
        progressBar: true
      });
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined
    }
  }
  get f(){
    return this.form.controls;
  }

  loginUser(){
    this.submitted =true;
    if(this.form.invalid){
      return;
    }
    this.authService.loginUser(this.form.value).subscribe(res => {
      this.data = res
      // Store Token
      localStorage.setItem('token', res.token)
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut:4000,
        progressBar:true
      });
      if(this.previousUrl){
        this.router.navigate([this.previousUrl])
      }else{
        this.router.navigate(['/'])
      }
    }, err=> {
      this.toastr.error(JSON.stringify(500), JSON.stringify("Invlaid User Name Or Password"), {
        timeOut:4000,
        progressBar:true
      });
    })
  }

}
