import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private form: FormBuilder, private http: HttpClient, private router: Router) { }

  formdata = { name: "", email: "", password: "" };
  submit = false;
  errorMessage = "";
  loading = false;

  ngOnInit(): void {
  }

  onSubmit() {
    // console.log(this.formdata);
    this.loading = true;

    //call register service
    this.auth.register(this.formdata.name, this.formdata.email, this.formdata.password).subscribe(
      {
        next: data => {
          //store token from response data
          this.auth.storeToken(data.idToken);
          console.log("register idToken: " + data.idToken);
          this.router.navigate(['/dashboard']);
        },
        error: data => {
          if (data.error.error.message == "INVALID_EMAIL") {
            this.errorMessage = "Invalid Email";
          } else if (data.error.error.message == "EMAIL_EXISTS") {
            this.errorMessage = "Email already exists";
          }
          else {

            this.errorMessage = "Unknown error occured when creating this account";
          }
        }
      }
    ).add(() => {
      this.loading = false;
      console.log("register completed!");
    }
    )
  }
}
