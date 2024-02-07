import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


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

  detail() {
    let token = sessionStorage.getItem('token');

    return this.http.post<{ users: Array<{ localId: string, displayName: string, email: string, photoUrl: string }> }>(
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

  canAuthenticate() {
    if (this.isAuthenticated()) {
      //redirect to dashboard page
      this.router.navigate(['/dashboard']);
    }

  }



  //logout
  logout() {
    sessionStorage.removeItem('token');
  }

  //forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  //email verification
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/verify-email']);
      },
      (err: any) => {
        alert('Something went wrong! Not able to send mail to your email.');
      }
    );
  }






}
