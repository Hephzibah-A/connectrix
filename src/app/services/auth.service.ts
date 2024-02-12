import { environment } from './../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router, private http: HttpClient) { }

  //register
  register(name: string, email: string, password: string) {
    return this.http.post<{ idToken: string }>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRUwKqauplMTlHl4cckXzuIYuXsVkbd-4',
      { displayName: name, email, password }
    );

  }

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  //login
  login(email: string, password: string) {
    //call login service
    return this.http.post<{ idToken: string }>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRUwKqauplMTlHl4cckXzuIYuXsVkbd-4',
      { email, password });
  }


  // Send email verification using Firebase REST API
  sendEmailVerification(idToken: string) {
    const body = {
      requestType: 'VERIFY_EMAIL',
      idToken: idToken
    };
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBRUwKqauplMTlHl4cckXzuIYuXsVkbd-4',
      body
    );
  }

  getuserrole() {
    return this.http.get('https://connect-kh8w.onrender.com/role');
  }

  GetAllRole() {
    return this.http.get('https://connect-kh8w.onrender.com/role');
  }

  detail() {
    let token = sessionStorage.getItem('token');

    return this.http.post<{ users: Array<{ localId: string, displayName: string, email: string, photoUrl: string, emailVerified: boolean }> }>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBRUwKqauplMTlHl4cckXzuIYuXsVkbd-4',
      { idToken: token }
    );
  }
  
  canAccess() {
    if (!this.isAuthenticated()) {
      //redirect to login page
      this.router.navigate(['/login']);
    }
  }

  // canAuthenticate() {
  //   if (!this.isAuthenticated()) {
  //     //redirect to dashboard page
  //     this.router.navigate(['/dashboard']);
  //   }

  // }

  //method to find whether the user is authenticated or not
  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  canAuthenticate() {
    if (this.isAuthenticated()) {
      //redirect to dashboard page
      this.router.navigate(['/dashboard']);
    }

  }

  UpdateUser(code: any, inputdata: any) {
    return this.http.put(this.url + '/' + code, inputdata);
  }



  //logout
  logout() {
    sessionStorage.removeItem('token');
  }

  url = 'http://localhost:3000/user';

  GetAll() {
    return this.http.get(this.url);
  }

  GetByCode(code: any) {
    return this.http.get(this.url + '/' + code);
  }







}
