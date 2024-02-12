import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private builder: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService, private postService: PostService) { }



  registerform = this.builder.group({
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z/d$@$!%*?&].{8,}')])),
    country: this.builder.control('', Validators.required),
    state: this.builder.control('', Validators.required),
    city: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(10)])),
    role: this.builder.control(''),
    isEmailVerified: this.builder.control(false),
    isactive: this.builder.control(false)

  });
  submit = false;
  errorMessage = "";
  loading = false;
  public user = { localId: "", displayName: "", email: "", profileUrl: "", isEmailVerified: false }

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
  }


  onSubmit() {
    // console.log(this.formdata);
    this.loading = true;



    //call register service
    if (this.registerform.valid) {
      this.auth.register(this.registerform.value.name!, this.registerform.value.email!, this.registerform.value.password!).subscribe(
        {
          next: data => {
            //store token from response data
            this.auth.storeToken(data.idToken);
            console.log("register idToken: " + data.idToken);
            this.toastr.success('Wait for Admin approval. You will be contacted within the next 72 hours', 'Registration Successful');
            this.auth.detail().subscribe({
              next: data => {
                this.user.isEmailVerified = data.users[0].emailVerified;
                console.log("isEmailVerified: " + this.user.isEmailVerified);
                if (this.user.isEmailVerified) {
                  this.router.navigate(['/login']);
                }
                else {
                  this.router.navigate(['/verify-email']);
                }
              }
            })
            // this.router.navigate(['/login']);
          },
          error: data => {
            if (data.error.error.message == "INVALID_EMAIL") {
              this.errorMessage = "Invalid Email";
              this.toastr.warning("Invalid Email");
            } else if (data.error.error.message == "EMAIL_EXISTS") {
              this.errorMessage = "Email already exists";
              this.toastr.warning('Email already exixts');
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

  onButtonClick(): void {

    this.postService.postMethod(this.registerform).subscribe(
      (response) => {
        // Handle successful response
        console.log('Post request successful', response);
      },
      (error) => {
        // Handle error response
        console.error('Error in post request', error);
      }
    );
  }
}