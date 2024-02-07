import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
  template: `<div *ngIf="isLoading">Loading...</div>
  <div *ngIf="!isLoading && isVerified">Email Verified! Redirecting...</div>
  <div *ngIf="!isLoading && !isVerified">Email Verification Failed. Please try again.</div>
`,
})
export class VerifyEmailComponent implements OnInit {
  allowVerifyButton: boolean = false;


  constructor(
  ) {
    setTimeout(() => {
      this.allowVerifyButton = true;
    }, 5000)
  }

  ngOnInit() { }


}
