import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __values } from 'tslib';

import { catchError, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImagePostService {

  user = { localId: "", displayName: "", email: "", profileUrl: "" }

  constructor(private http: HttpClient) { }
  private url = 'https://connect-kh8w.onrender.com/login/registration';

  imgpost(data: any) {
    return this.http.post<any>(this.url, data);

  }

  uploadData(uid: any, email: any, user_name: any, country: any, state: any, city: any, image: File,): any {
    const formData: FormData = new FormData();
    formData.append('profile_image', image, image.name);
    console.log(image);
    formData.append('uid', uid);
    formData.append('email', email);
    formData.append('user_name', user_name);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);

    return this.http.post(this.url, formData);
  }


}














