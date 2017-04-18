import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'app/authentication/services/authentication.service';
import { AuthGuard } from 'app/authentication/guards/auth.guards';
import { LoginComponent } from 'app/authentication/components/login/login.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard
  ]
})
export class AuthenticationModule { }