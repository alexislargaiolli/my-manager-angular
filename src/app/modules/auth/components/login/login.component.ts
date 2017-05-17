import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from 'app/modules/core';
import { NavigationService } from '../../../project/services/navigation.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionActions } from '../../redux/session/session.actions';
import { select } from '@angular-redux/store';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @select(['session', 'logging_in'])
  loading$;

  @select(['session', 'error'])
  error$;

  constructor(private _sessionAction: SessionActions) { }

  ngOnInit() { }

  login(form: NgForm) {
    this._sessionAction.dispatchLogin(form.value);
  }
}
