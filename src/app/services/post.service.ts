import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //  https://connect-kh8w.onrender.com/poster/getposter
  private posterUrl = 'https://connect-kh8w.onrender.com/poster';
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private url = 'https://connect-kh8w.onrender.com/login/registration';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any[]>(`${this.posterUrl}/getposter`);
  }

  postMethod(data: any): Observable<any> {

    return this.http.post<any>(this.url, data);
  }
}

