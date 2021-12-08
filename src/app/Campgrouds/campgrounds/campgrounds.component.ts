import { Component, OnInit } from '@angular/core';
import { CampgroundsService } from 'src/app/services/campgrounds.service';
@Component({
  selector: 'app-campgrounds',
  templateUrl: './campgrounds.component.html',
  styleUrls: ['./campgrounds.component.css']
})
export class CampgroundsComponent implements OnInit {

  camps:any;
  constructor(private campgroundService: CampgroundsService) { }

  ngOnInit(): void {
    this.getCamps();
  }
  getCamps(){
    return this.campgroundService.getAllCamp().subscribe(res => {
      this.camps = res;
      console.log(this.camps);
    })
  }

}
