import { Component, OnInit } from '@angular/core';

import { Address, Profile } from 'app/models';
import { ModelUtils, RepositoriesService } from 'app/modules/core';
import { User } from 'app/modules/core/models/user.model';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { ProfileActions } from "app/modules/store";
import { IAppState } from '../../../store/store.types';

@Component({
  templateUrl: './user-profile-general.component.html',
  styleUrls: ['./user-profile-general.component.css']
})
export class UserProfileGeneralComponent implements OnInit {

  @select(['profile', 'profile'])
  public profile$: Observable<Profile>;

  @select(['profile', 'loading'])
  public loading$: Observable<boolean>;

  constructor(private _profileActions: ProfileActions, private _redux: NgRedux<IAppState>) { }

  ngOnInit() { }

  public saveAddress(address: Address) {
    let profile = Object.assign({}, this._redux.getState().profile.profile);
    profile.addresses.push(address);
    this._profileActions.dispatchUpdate(profile);
  }

  public deleteAddress(address: Address) {
    let profile = Object.assign({}, this._redux.getState().profile.profile);
    ModelUtils.remove(profile.addresses, address);
    this._profileActions.dispatchUpdate(profile);
  }

}
