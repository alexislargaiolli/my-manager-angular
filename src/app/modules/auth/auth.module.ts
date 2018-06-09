import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guards';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'app/modules/shared/shared.module';
import { SessionActions } from './redux/session/session.actions';
import { SessionEpics } from './redux/session/session.epics';
import { RegisterComponent } from './components/register/register.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    LoginRegisterComponent
  ],
  providers: [
    AuthenticationService,
    SessionActions,
    SessionEpics,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }
