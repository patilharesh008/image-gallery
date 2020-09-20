import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  addImage(image: File) {
        
    const formData = new FormData();
    if(image != null)
        formData.append('image', image);


    this.http.post('http://localhost:3000/addImg', formData)
          .subscribe((data) => {
          });
    
    }

  getImage(): Observable<any>{
    return this.http.get('http://localhost:3000/show');
  }
}

