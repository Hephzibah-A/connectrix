import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private auth: AuthService, private form: FormBuilder, private http: HttpClient, private route: Router) { }
  formdata = { email: "", password: "" };
  submit = false;
  errorMessage = "";
  loading = false;

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    // console.log(this.formdata);
    this.loading = true;

    //call register service
    this.auth.login(this.formdata.email, this.formdata.password).subscribe({
      next: data => {
        //store token
        this.auth.storeToken(data.idToken);
        console.log("user token " + data.idToken);
        this.route.navigate(['/dashboard']);
      },
      error: data => {
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
