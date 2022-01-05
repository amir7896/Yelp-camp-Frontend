import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// Map Box
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampgroundsService {
  
  private getHeaders() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });
    
    return headers;
  }

  constructor(private httpclient : HttpClient) { 
   
  }

  getAllCamp(){
    return this.httpclient.get('campgrounds')
  }
  // ====================================
  // Insert Camp Groud With File Upload
  // ====================================
  InsertCampGround(title: string,location: string, price: string, description: string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("images", profileImage);

    return this.httpclient.post('campgrounds', formData, { headers: this.getHeaders() })
  }
  // ========================================
  // Simple Create Camp Ground By  Image URL
  // =========================================
  insertData(data: any){
    return this.httpclient.post('campgrounds', data, { headers: this.getHeaders() })
  }
  getDataById(id: any){
    return this.httpclient.get('campgrounds/'+id)
  }
  // Not Using For Updating campgrounds its not working in camping..
  updateData(id: any , data: any){
    return this.httpclient.put('campgrounds/'+id, data)
  }
  // ==================================
  // Update Camp Groud By File Upload
  // ==================================
  updateCampGround(id:any ,title: any,location: string, price: string, description: string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("images", profileImage);

    return this.httpclient.put('campgrounds/'+id, formData, { headers: this.getHeaders() })
  }
  deleteData(id: any){
    return this.httpclient.delete('campgrounds/'+id)
  }
  // Adding Reviews In Campground
  insertReview(id:any, data:any){
    return this.httpclient.post('campgrounds/'+id+'/reviews' ,data )
  }
  // Delete Review
  deleteReview(id:any, reviewId:any){
    return this.httpclient.delete('campgrounds/'+id+'/reviews/'+reviewId )
  }

  // ===================
  // Map Box 
  // ===================
  // map!: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/streets-v11';
  // lat = 45.899977;
  // lng = 6.172652;
  // zoom = 12
  // buildMap() {
  //   this.map = new mapboxgl.Map({
  //     accessToken:environment.mapbox.accessToken,
  //     container: 'map', // container ID
  //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
  //     center: [73.074144, 33.719361], // starting position [lng, lat]
  //     zoom: 9 // starting zoom
  //     // container: 'map',
  //     // style: this.style,
  //     // zoom: this.zoom,
  //     // center: [this.lng, this.lat]
  //   })
  //  this.map.addControl(new mapboxgl.NavigationControl());
  //  new mapboxgl.Marker()
  //  .setLngLat([73.074144, 33.719361])
  //  .addTo(this.map)

  // }

}
