import { Component, OnInit, OnDestroy } from '@angular/core';

import { Address, Profile } from 'app/models';
import { ModelUtils, RepositoriesService } from 'app/modules/core';
import { User } from 'app/modules/core/models/user.model';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { ProfileActions } from 'app/modules/store';
import { IAppState } from '../../../store/store.types';
import { Subscription } from 'rxjs/Rx';

@Component({
  templateUrl: './user-profile-general.component.html',
  styleUrls: ['./user-profile-general.component.css']
})
export class UserProfileGeneralComponent implements OnInit, OnDestroy {

  @select(['profile', 'loading'])
  public loading$: Observable<boolean>;

  profile: Profile;

  profileSubscription: Subscription;

  constructor(private _profileActions: ProfileActions, private _redux: NgRedux<IAppState>) {
    this.profileSubscription = this._redux.select<Profile>(['profile', 'profile'])
      .subscribe(p => {
        this.profile = Object.assign({}, p);
      });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  public saveProfile() {
    this._profileActions.dispatchUpdate(this.profile);
  }

  public saveAddress(address: Address) {
    this._profileActions.dispatchUpdate(this.profile);
  }

  public deleteAddress(address: Address) {
    this._profileActions.dispatchUpdate(this.profile);
  }

}
