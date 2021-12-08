import { Component, OnInit } from '@angular/core';
import { CampgroundsService } from 'src/app/services/campgrounds.service';
import { Campgrounds } from 'src/app/models/campgrounds.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reviews } from 'src/app/models/reviews.model';
import { AuthServicesService } from 'src/app/services/Authserice/auth-services.service';

@Component({
  selector: 'app-campground-detail',
  templateUrl: './campground-detail.component.html',
  styleUrls: ['./campground-detail.component.css']
})
export class CampgroundDetailComponent implements OnInit {
  // =========================
  // Form For Inserting Review
  // =========================
  form! : FormGroup;

  data:any;
  delreview:any;
  camp:any;
  submitted=false;
  loginuser:any;


  reviews: Reviews = {
    _id: '',
    rating: '',
    comment: ''
  }
  camps:any;
  // camps : Campgrounds ={
  //   _id: '',
  //   title: '',
  //   description: '',
  //   image: '',
  //   location: '',
  //   price: '',
  //   Reviews:''
  // }

  constructor( private campgroundService: CampgroundsService,
    private route: ActivatedRoute,
    private router: Router,
    private taostr: ToastrService, 
    private formBuilder: FormBuilder,
    private authSevicie: AuthServicesService) { }

    // ==============================
    // Creat Form For The Review ADD
    // ==============================
    createForm(){
      this.form = this.formBuilder.group({
        comment: ['', Validators.required],
        rating: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.getCampGround(this.route.snapshot.params.id);
    this.getLoginUser();
    this.createForm();
    
  }
  get f(){
    return this.form.controls;
  }
  getCampGround(id: any) {
    this.campgroundService.getDataById(id).subscribe(res => {
      this.camp = res;
      this.camps =res;
      console.log('Sigle Camp Getting BY ID',this.camp);
    });
  }
  getCampGroundReviews(campgroundObj: any) {
    this.campgroundService.getDataById(campgroundObj.reviews).subscribe(res => {
      this.camps = res;
      // this.camps =res;
    });
  }
  deleteData(_id:any){
    this.campgroundService.deleteData(_id).subscribe(res => {
      this.data =res;
      this.taostr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut:2000,
        progressBar:true
      })
      this.router.navigateByUrl('/');
    })
  }

  insertReview(id:any){
    this.submitted=true;
    if(this.form.invalid){
      return;
    }
    this.campgroundService.insertReview(id, this.form.value).subscribe(res => {
      this.camp = res;
      console.log(this.camp);
      this.taostr.success(JSON.stringify(this.camp.code), JSON.stringify(this.camp.message), {
        progressBar:true,
        timeOut:2000
      })
      window.location.reload();
    })
  }
  deleteReview(campId:any, reviewId:any){
    this.campgroundService.deleteReview(campId,reviewId).subscribe(res => {
      this.delreview = res ;
      this.taostr.error(JSON.stringify(this.delreview.code), JSON.stringify(this.delreview.message),{
        timeOut:2000,
        progressBar:true
      })
      window.location.reload();
    })
  }
  // Get Login User
  getLoginUser(){
    return this.authSevicie.getAllUsers().subscribe(res => {
      this.loginuser = res;
      // console.log(this.loginuser);
    })
  }
}
