import { Component, OnInit } from '@angular/core';
import { CurrentSession, NotificationService, User } from 'app/modules/core';
import { AuthenticationService, SessionActions } from 'app/modules/auth';
import { NavigationService } from '../../../../project/services/navigation.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @select(['session', 'user'])
  user$: Observable<User>;

  constructor(private _ngRedux: NgRedux<IAppState>, private _sessionActions: SessionActions) { }

  ngOnInit() { }

}
