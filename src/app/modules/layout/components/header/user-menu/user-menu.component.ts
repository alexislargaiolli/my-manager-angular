import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, SessionActions } from 'app/modules/auth';
import { NavigationService } from '../../../../project/services/navigation.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/modules/core';
import { Profile } from 'app/models';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Input()
  profile: Profile;

  constructor(private _ngRedux: NgRedux<IAppState>, private _sessionActions: SessionActions) { }

  ngOnInit() { }

  public logout() {
    this._sessionActions.dispatchLogout()
  }

}
