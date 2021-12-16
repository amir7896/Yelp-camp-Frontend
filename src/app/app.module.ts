import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampgroundsComponent } from './Campgrouds/campgrounds/campgrounds.component';
import { AddCampgroundComponent } from './Campgrouds/add-campground/add-campground.component';
import { EditCampgroundComponent } from './Campgrouds/edit-campground/edit-campground.component';
import { CampgroundDetailComponent } from './Campgrouds/campground-detail/campground-detail.component';
import { NavbarComponent } from './navbar/navbar.component';

// ==================================
// Toaster Module For Flash Messages
// ==================================
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// =======================
// Alll Neede Imports.....
// =======================
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule , Routes} from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthServicesService } from './services/Authserice/auth-services.service';
import { CampgroundsService } from './services/campgrounds.service';
import { TokenInterceptorService } from './services/TokenService/token-interceptor.service';

//Flash Message Module
import { FlashMessagesModule } from  'flash-messages-angular'
//Image Upload
import { FileUploadModule } from 'ng2-file-upload';
import { ForgotPasswordComponent } from './resetPassword/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './resetPassword/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    CampgroundsComponent,
    AddCampgroundComponent,
    EditCampgroundComponent,
    CampgroundDetailComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FlashMessagesModule.forRoot(),
    FileUploadModule


  ],
  providers: [AuthGuard, 
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
