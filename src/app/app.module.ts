import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { environment } from '../environments/environment.development';
import { RegisterComponent } from './component/register/register.component'; // Import the environment object
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AdminComponent } from './component/admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { NavbarComponent } from './component/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserlistingComponent } from './component/userlisting/userlisting.component';
import { UpdatepopupComponent } from './component/updatepopup/updatepopup.component';
import { ImagePostComponent } from './component/image-post/image-post.component';
import { MaterialModule } from '../material.module';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { AddPostsComponent } from './component/add-posts/add-posts.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AdminComponent,
    NavbarComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    ImagePostComponent,
    VerifyEmailComponent,
    SideBarComponent,
    AddPostsComponent,
    UserDashboardComponent


  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // Access the firebase property from the environment object
    FormsModule,
    RouterModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right'
    }),
    HttpClientModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    MatIconModule,
    MatToolbarModule,
    MatButton,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {

}
