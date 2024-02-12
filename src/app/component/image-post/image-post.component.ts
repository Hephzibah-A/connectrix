import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { ImagePostService } from '../../services/image-post.service';
import { profile } from 'console';

@Component({
  selector: 'app-image-post',
  templateUrl: './image-post.component.html',
  styleUrl: './image-post.component.css'
})
export class ImagePostComponent implements OnInit {
  constructor(private route: Router, private postService: PostService, private form: FormBuilder, private imgpost: ImagePostService, private auth: AuthService) { }
  selectedFile: File | undefined;
  textData: string = "";

  image: any;
  email: any;
  uid: any;
  user_name: any;
  country: any;
  city: any;
  state: any;

  user = { localId: "", displayName: "", email: "", profileUrl: "" }



  myForm = this.form.group({
    uid: this.user.localId,
    email: [''],
    user_name: [''], country:
      [''], state: [''], city: [''],
  })

  uploadImage(event: any) {
    // console.log(event);
    this.uid = this.user.localId;
    this.email = this.myForm.value['email'];
    this.user_name = this.myForm.value['user_name'];
    this.country = this.myForm.value['country'];
    this.state = this.myForm.value['state'];
    this.city = this.myForm.value['city'];
    event.preventDefault();

    // console.log(this.selectedFile?.name);

    if (this.selectedFile) {
      this.imgpost.uploadData(this.uid, this.email, this.user_name, this.country, this.state, this.city, this.selectedFile).subscribe((res: any) => {
        console.log('Image uploaded successfully', res);
      }, (err: any) => {
        console.error('Error uploading image', err);

      }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files ? event.target.files[0] : null;
    console.log(this.selectedFile);
    this.image = this.selectedFile?.name;
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
      })
    }
  }
}