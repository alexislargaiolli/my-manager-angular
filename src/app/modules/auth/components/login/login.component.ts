import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NotificationService } from 'app/modules/core';
import { NavigationService } from '../../../project/services/navigation.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionActions } from '../../redux/session/session.actions';
import { select, NgRedux } from '@angular-redux/store';
import { NgForm } from '@angular/forms';
import { IAppState } from '../../../store/store.types';
import { trigger, transition, animate, style } from '@angular/animations';
import { ReduxSubscriptionComponent } from '../../../core/components/redux-subscription-component/redux-subscription-component';
import { Profile } from 'app/models';
import { fadeAnim } from 'app/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnim]
})
export class LoginComponent extends ReduxSubscriptionComponent implements OnInit, OnDestroy {

  @select(['session', 'error'])
  error$;
  loading = false;
  authenticated = false;
  onUserLogin: Subscription;

  constructor(private _sessionAction: SessionActions, private _ngRedux: NgRedux<IAppState>, private _router: Router) {
    super();
  }

  ngOnInit() {
    this.addSub(this._ngRedux.select(['session', 'logging_in']).subscribe((loading: boolean) => {
      this.loading = loading;
    }));

    this.addSub(this._ngRedux.select(['session', 'authenticated']).subscribe((authenticated: boolean) => {
      this.authenticated = authenticated;
      if (authenticated) {
        this._router.navigate(['project']);
      }
    }));
  }

  login(form: NgForm) {
    if (form.valid) {
      this._sessionAction.dispatchLogin(form.value);
    }
  }
}
