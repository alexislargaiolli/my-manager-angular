import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guards';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'app/modules/shared/shared.module';
import { SessionActions } from './redux/session/session.actions';
import { SessionEpics } from './redux/session/session.epics';

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
    SessionActions,
    SessionEpics,
    AuthGuard
  ]
})
export class AuthModule { }
