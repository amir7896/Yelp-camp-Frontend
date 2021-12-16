import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServicesService } from 'src/app/services/Authserice/auth-services.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form! : FormGroup;
  submitted =false;
  data: any;

  constructor( private authService: AuthServicesService,
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  // Form For Sending Mail
  creatForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.creatForm();
  }
  get f(){
    return this.form.controls;
  }

  resetPassword(){
    this.submitted =true;
    if(this.form.invalid){
      return;
    }
    this.authService.forgetPassword(this.form.value).subscribe(res => {
      this.data = res;
      if(this.data){
        this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
          timeOut:2000,
          progressBar:true
        });
        this.router.navigate(['/login']);
      }else if(!this.data){
        this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message),{
          progressBar: true,
          timeOut: 3000
        
        })
      }
    }, (err => {
      this.toastr.error(JSON.stringify('500'), JSON.stringify('Email Not Exists'),{
        progressBar: true,
        timeOut: 3000
      
      })
    }))
  }

}
