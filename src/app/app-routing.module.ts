import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { AddCampgroundComponent } from './Campgrouds/add-campground/add-campground.component';
import { CampgroundDetailComponent } from './Campgrouds/campground-detail/campground-detail.component';
import { CampgroundsComponent } from './Campgrouds/campgrounds/campgrounds.component';
import { EditCampgroundComponent } from './Campgrouds/edit-campground/edit-campground.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '' , component:CampgroundsComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
