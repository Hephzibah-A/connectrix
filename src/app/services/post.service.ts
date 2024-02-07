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

  constructor(private http: HttpClient) { }



  // detail() {
  //   let token = sessionStorage.getItem('token');

  //   return this.http.post<{ users: Array<{ localId: string, displayName: string }> }>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBRUwKqauplMTlHl4cckXzuIYuXsVkbd-4',
  //     { idToken: token }
  //   );
  // }

  getPosts(): Observable<any> {
    return this.http.get<any[]>(`${this.posterUrl}/getposter`);
  }
}
