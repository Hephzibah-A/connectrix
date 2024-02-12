import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';


import { AdminComponent } from './component/admin/admin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserlistingComponent } from './component/userlisting/userlisting.component';
import { ImagePostComponent } from './component/image-post/image-post.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';


const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent },
    { path: 'user', component: UserlistingComponent, canActivate: [AuthGuard] },
    { path: 'image-post', component: ImagePostComponent },
    { path: 'verify-email', component: VerifyEmailComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
