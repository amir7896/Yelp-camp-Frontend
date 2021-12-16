import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServicesService } from 'src/app/services/Authserice/auth-services.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  gettingtoken:any;
  form! : FormGroup;
  submitted =false;
  data: any;
  token:any


  constructor(private authService: AuthServicesService,
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

    // Form For Changing Password
    creatForm(){
      this.form = this.formBuilder.group({
        password: ['', Validators.required],
        confirm: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.gettingtoken = (this.route.snapshot.params.token);
    //form for submit value
    this.creatForm();
    console.log(this.gettingtoken);
    this.creatForm();
  }
  get f(){
    return this.form.controls;
  }
  changePassword(){
    this.submitted =true;
    if(this.form.invalid){
      return;
    }
    this.authService.changeUserPassword(this.gettingtoken, this.form.value).subscribe(res => {
      this.data = res;
      if(this.data){
        this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
          progressBar: true,
          timeOut:3000,
        })
        this.router.navigate(['/login']);
      }else {
        this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
          timeOut: 3000,
          progressBar: true,
          positionClass:'bottom-left',
          closeButton: true,
          
        })
        
        this.router.navigate(['/reset/'+this.gettingtoken]);
      }
    })
  }

}
