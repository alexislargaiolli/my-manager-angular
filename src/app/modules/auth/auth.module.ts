import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guards';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'app/modules/shared/shared.module';

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
export class AuthModule { }