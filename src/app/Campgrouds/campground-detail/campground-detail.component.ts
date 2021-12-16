import { Component, OnInit } from '@angular/core';
import { CampgroundsService } from 'src/app/services/campgrounds.service';
import { Campgrounds } from 'src/app/models/campgrounds.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reviews } from 'src/app/models/reviews.model';
import { AuthServicesService } from 'src/app/services/Authserice/auth-services.service';
// Map Box
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

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

  currentRate = 8;
  data:any;
  delreview:any;
  camp:any;
  submitted=false;
  loginuser:any;
  // For Map
  map!: mapboxgl.Map;
  // Map Center Variables
  longi!: number;
  lati! : number






  reviews: Reviews = {
    _id: '',
    rating: '',
    comment: ''
  }
  camps:any;


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
    // Mapbox
    //this.buildMap(); 
  }
  get f(){
    return this.form.controls;
  }
  // lat = 31.497754
  // lng = 74.360106
  
  getCampGround(id: any) {
    this.campgroundService.getDataById(id).subscribe(res  => {
      this.camp = res;
      this.camps =res;
      this.longi = this.camp.geometry.coordinates[0];
      this.lati  = this.camp.geometry.coordinates[1];
      // console.log('Longitutde is  =', this.longi);
      // console.log('Latitude = ', this.lati)
      console.log('Sigle Camp Getting BY ID',this.camp);
      // Map Of Camp ....
      
      this.map = new mapboxgl.Map({
      accessToken:environment.mapbox.accessToken,
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.longi, this.lati] ,  // starting position [lng, lat]
      zoom: 9 //
      })
      this.map.addControl(new mapboxgl.NavigationControl());
      new mapboxgl.Marker()
      .setLngLat([this.longi, this.lati])
      .setPopup(
        new mapboxgl.Popup({offset:15})
        .setHTML(
          `<h3> ${this.camp.title} </h3> <p> ${this.camp.location}</p>`
        )
      )
      .addTo(this.map)
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

  // =======================
  // Creating  MAP of Camp
  // =======================

  // buildMap() {
  //   this.map = new mapboxgl.Map({
  //     accessToken:environment.mapbox.accessToken,
  //     container: 'map', // container ID
  //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
  //     center: [this.lng, this.lat] ,  // starting position [lng, lat]
  //     zoom: 9 // starting zoom
  //     // container: 'map',
  //     // style: this.style,
  //     // zoom: this.zoom,
  //     // center: [this.lng, this.lat]
  //   })
    
  //  this.map.addControl(new mapboxgl.NavigationControl());
  //  new mapboxgl.Marker()
  //  .setLngLat([this.lng, this.lat])
  //  .addTo(this.map)

  // }

}
