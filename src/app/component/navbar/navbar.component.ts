import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isadmin = false;
  isMenuRequired = false;
  constructor(private router: Router, public auth: AuthService) {


  }


  ngDoCheck(): void {
    let role = sessionStorage.getItem('role');
    let currenturl = this.router.url;
    if ((currenturl == '/login' || currenturl == '/register')) {
      this.isMenuRequired = false;
    }
    else {
      this.isMenuRequired = true;
    }
  }

  user = { localId: "", displayName: "", email: "", profileUrl: "" }

  logout() {
    this.auth.logout();
    this.auth.canAccess();
  }


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
        }
      });
      let role = sessionStorage.getItem('role');
      if (role == 'admin') {
        this.isadmin = true;
      }
      else {

        this.isadmin = false;
      }
    }
  }
}
