import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

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

  constructor(private httpclient : HttpClient) { }

  getAllCamp(){
    return this.httpclient.get('http://localhost:3000/campgrounds')
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

    return this.httpclient.post('http://localhost:3000/campgrounds', formData, { headers: this.getHeaders() })
  }
  // ========================================
  // Simple Create Camp Ground By  Image URL
  // =========================================
  insertData(data: any){
    return this.httpclient.post('http://localhost:3000/campgrounds', data, { headers: this.getHeaders() })
  }
  getDataById(id: any){
    return this.httpclient.get('http://localhost:3000/campgrounds/'+id)
  }
  // Not Using For Updating campgrounds its not working in camping..
  updateData(id: any , data: any){
    return this.httpclient.put('http://localhost:3000/campgrounds/'+id, data)
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

    return this.httpclient.put('http://localhost:3000/campgrounds/'+id, formData, { headers: this.getHeaders() })
  }
  deleteData(id: any){
    return this.httpclient.delete('http://localhost:3000/campgrounds/'+id)
  }
  // Adding Reviews In Campground
  insertReview(id:any, data:any){
    return this.httpclient.post('http://localhost:3000/campgrounds/'+id+'/reviews' ,data )
  }
  // Delete Review
  deleteReview(id:any, reviewId:any){
    return this.httpclient.delete('http://localhost:3000/campgrounds/'+id+'/reviews/'+reviewId )
  }

}
