import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  constructor(private auth: AuthService, private toastr: ToastrService, private updateSubscription: Subscription, private router: Router) {

  }


  ngOnInit() {
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
      });
      this.updateSubscription = interval(1000).subscribe(
        (val) => {
          if (this.user.isEmailVerified) {
            this.toastr.success('Email verified successfully', 'Success');
            this.router.navigate(['/login']);
            this.updateSubscription.unsubscribe();
          }
        });
    }
  }
  isVerified = false;

  idTokenurl: any;
  public user = { localId: "", displayName: "", email: "", profileUrl: "", isEmailVerified: false }


  sendVerificationEmail() {
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

  }

}
