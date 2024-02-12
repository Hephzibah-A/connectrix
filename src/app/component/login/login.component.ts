import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  useremail: any;
  userpassword: any;
  personalData: any;

  constructor(private auth: AuthService, private builder: FormBuilder, private http: HttpClient, private route: Router, private toastr: ToastrService) { }
  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });
  submit = false;
  errorMessage = "";
  loading = false;
  public user = { localId: "", displayName: "", email: "", profileUrl: "", idTokenurl: " " }


  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    // console.log(this.formdata);
    this.loading = true;

    //call register service
    this.auth.login(this.loginform.value.email!, this.loginform.value.password!).subscribe({
      next: data => {
        //store token
        this.auth.storeToken(data.idToken);

        console.log("user token " + data.idToken);
        this.user.idTokenurl = data.idToken;

        this.route.navigate(['/verify-email']);
        this.toastr.success('Verify your email address');
        if (this.auth.isAuthenticated()) {
          this.auth.detail().subscribe({
            next: data => {
              this.user.localId = data.users[0].localId;
              this.user.displayName = data.users[0].displayName;
              this.user.email = data.users[0].email;
              this.user.profileUrl = data.users[0].photoUrl;
              this.toastr.success('Welcome ' + this.user.displayName + ' Login Successful');
            }
          });
        }

      },
      error: data => {
        this.toastr.error('Invalid credentials');
        if (data.error.error.message == "INVALID_PASSWORD") {
          this.errorMessage = "Invalid Password";
        } else if (data.error.error.message == "INVALID_EMAIL") {
          this.errorMessage = "Invalid Email";
        } else {
          this.errorMessage = "Invalid Error when logging into this account"
        }
      }
    }).add(() => {
      this.loading = false;
      console.log("Login process completed");
    })
  }



}
