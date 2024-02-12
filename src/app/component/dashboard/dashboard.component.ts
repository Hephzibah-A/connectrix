
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  posts: any[] = [];

  public user = { localId: "", displayName: "", email: "", profileUrl: "", isEmailVerified: false }


  constructor(private auth: AuthService, private postService: PostService) { }

  ngOnInit(): void {

    this.auth.canAccess();

    if (this.auth.isAuthenticated()) {
      //call user details service
      this.auth.detail().subscribe({
        next: data => {
          this.user.localId = data.users[0].localId;
          this.user.displayName = data.users[0].displayName;
          this.user.email = data.users[0].email;
          this.user.profileUrl = data.users[0].photoUrl;
          this.user.isEmailVerified = data.users[0].emailVerified;
        }
      })
    }

    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });


  }

  logout() {
    this.auth.logout();
  }



}
