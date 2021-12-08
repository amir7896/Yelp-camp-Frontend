import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CampgroundsService } from 'src/app/services/campgrounds.service';
import { HttpErrorResponse, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { HttpClient, HttpEventType} from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';


const URL = 'http://localhost:3000/campgrounds';

@Component({
  selector: 'app-add-campground',
  templateUrl: './add-campground.component.html',
  styleUrls: ['./add-campground.component.css']
})


export class AddCampgroundComponent implements OnInit {
  data:any;

  form! : FormGroup;
  submitted =false;
  
  constructor(private campgroundService : CampgroundsService,
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    private router: Router) { }

    creatForm(){
      this.form = this.formBuilder.group({
        title: ['', Validators.required],
        images: [null, Validators.required],
        location: ['', Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.creatForm();
  }
  
  get f(){
    return this.form.controls;
  }
  // ====================
  // File Upload Event 
  // ====================
  public uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
        return;
    }
    const file = input.files[0];
    this.form.patchValue({
      images: file
    });
    this.form.get('images')!.updateValueAndValidity()
 }

  // =================================
  // ADD Camp By File Upload Method
  // ==================================
 addCamp(){
  this.submitted =true;
  if(this.form.invalid){
    return;
  }
   this.campgroundService.InsertCampGround(
     this.form.value.title,
     this.form.value.location,
     this.form.value.price,
     this.form.value.description,
     this.form.value.images
   ).subscribe(res => {
     this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut:3000,
        progressBar: true
      });
     this.router.navigateByUrl('/');
   })
 }
}
