import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserDetailsService } from '../../services/user-details.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  userLogin: any;
  userId: any = [];
  title: any = [];

  urlData: any;


  constructor(private http: HttpClient, private service: UserDetailsService) { }

  submit() {
    // this.userLogin=sessionStorage.getItem('profile');
    // this.service.getUserDetails().subscribe((get) => {
    //   console.log(get);
    //   console.log(this.userLogin);
    // })

    // for (var i = 0; i < this.userLogin.length; i++) {
    //   console.log(this.userLogin[i].name);
    // }


    this.http.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe((get) => {

      this.urlData = get;

      for (var i = 0; i < get.length; i++) {
        this.userId = get[i].userId;
        this.title = get[i].title;
        console.log(this.userId);

      }
      // console.log(this.userId);

    })
  }

  logout() {
    sessionStorage.setItem('isLogged', 'false');
    window.location.reload();
  }

} 
