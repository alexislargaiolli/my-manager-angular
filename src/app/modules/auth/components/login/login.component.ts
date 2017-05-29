import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NotificationService } from 'app/modules/core';
import { NavigationService } from '../../../project/services/navigation.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionActions } from '../../redux/session/session.actions';
import { select, NgRedux } from '@angular-redux/store';
import { NgForm } from '@angular/forms';
import { IAppState } from '../../../store/store.types';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @select(['session', 'logging_in'])
  loading$;

  @select(['session', 'error'])
  error$;

  onUserLogin: Subscription;

  constructor(private _sessionAction: SessionActions, private _ngRedux: NgRedux<IAppState>, private _router: Router) {
  }

  ngOnInit() {
    this.onUserLogin = this._ngRedux.select(['session', 'user']).subscribe(user => {
      if (user != null) {
        this._router.navigate(['project']);
      }
    });
  }

  ngOnDestroy(): void {
    this.onUserLogin.unsubscribe();
  }

  login(form: NgForm) {
    this._sessionAction.dispatchLogin(form.value);
  }
}
