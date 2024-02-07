import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient) { }
  getUserDetails() { 
    return this.http.get<any>('http://localhost:3000/userDetails');
  }

}
