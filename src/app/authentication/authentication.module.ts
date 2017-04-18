import { NgModule } from '@angular/core';
import { AuthenticationService } from 'app/authentication/services/authentication.service';
import { AuthGuard } from 'app/authentication/guards/auth.guards';
import { LoginComponent } from 'app/authentication/components/login/login.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
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