import { Component, OnInit } from '@angular/core';
import { CampgroundsService } from 'src/app/services/campgrounds.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Campgrounds } from 'src/app/models/campgrounds.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-campground',
  templateUrl: './edit-campground.component.html',
  styleUrls: ['./edit-campground.component.css']
})


export class EditCampgroundComponent implements OnInit {

  campground:any;
  id:any;
  data:any;
  submitted = false;
  fileHolder!: File | null ;
files:any
  constructor(private campgroundService: CampgroundsService,
    private route: ActivatedRoute,
    private taostr: ToastrService,
    private router: Router) { this.fileHolder = null;}

    form  = new FormGroup({
      title:new FormControl('', Validators.required),
      images: new FormControl(null, Validators.required),
      location: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required) 
      })

      
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
 

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getData();
  }
  get f(){
    return this.form.controls;
  }
  getData(){
    this.campgroundService.getDataById(this.id).subscribe(res => {
      this.data = res; 
      this.campground = this.data;
      this.form.patchValue({
        title: this.campground.title,
        images: this.campground.images[0].url,
        location: this.campground.location,
        price: this.campground.price,
        description: this.campground.description,
     });
      console.log('Fetching Form Values',this.form.value);
      console.log('file data = ', this.campground.images[0].url);
    });
  }
  uddateData(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.campgroundService.updateCampGround(this.id, 
      this.form.value.title,
      this.form.value.location,
      this.form.value.price,
      this.form.value.description,
      this.form.value.images
      ).subscribe(res => {
        this.data = res;
        if(this.data){
          this.taostr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
            timeOut: 3000,
            progressBar: true
          });
          this.router.navigateByUrl('/campground/'+this.id);
        }else{
          this.taostr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
            timeOut: 3000,
            progressBar: true
          })
        }
      })
    // this.campgroundService.updateData(this.id, this.form.value).subscribe(res => {
    //   this.data = res;
    //   this.taostr.success(JSON.stringify(this.data.code),JSON.stringify(this.data.message), {
    //     timeOut:2000,
    //     progressBar:true
    //   });
    //   this.router.navigateByUrl('/campground/'+this.id);
    // })
  }

}
