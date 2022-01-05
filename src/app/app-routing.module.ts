import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { AddCampgroundComponent } from './Campgrouds/add-campground/add-campground.component';
import { CampgroundDetailComponent } from './Campgrouds/campground-detail/campground-detail.component';
import { CampgroundsComponent } from './Campgrouds/campgrounds/campgrounds.component';
import { EditCampgroundComponent } from './Campgrouds/edit-campground/edit-campground.component';
import { HomeComponent } from './Campgrouds/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { ForgotPasswordComponent } from './resetPassword/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './resetPassword/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '' , component:HomeComponent
  },
  {
    path: 'campgrounds', component: CampgroundsComponent
  },
  {
    path: 'add-campground' , component: AddCampgroundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'campground/:id/edit' , component: EditCampgroundComponent
  },
  { 
    path: 'campground/:id', component: CampgroundDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', component: LoginComponent
  },
  { 
    path: 'register', component: RegisterComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'reset/:token', component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
