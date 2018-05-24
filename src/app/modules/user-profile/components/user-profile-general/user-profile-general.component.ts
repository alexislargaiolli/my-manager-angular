import { Component, OnInit, OnDestroy } from '@angular/core';

import { Address, Profile } from 'app/models';
import { ModelUtils, RepositoriesService, ReduxSubscriptionComponent, NotificationService } from 'app/modules/core';
import { User } from 'app/modules/core/models/user.model';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { ProfileActions } from 'app/modules/store';
import { IAppState } from '../../../store/store.types';
import { slideApparitionAnimation } from 'app/animations';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './user-profile-general.component.html',
  styleUrls: ['./user-profile-general.component.css'],
  animations: [slideApparitionAnimation]
})
export class UserProfileGeneralComponent extends ReduxSubscriptionComponent implements OnInit, OnDestroy {

  @select(['profile', 'loading'])
  public loading$: Observable<boolean>;

  profile: Profile;

  profileSubscription: Subscription;

  constructor(
    private _profileActions: ProfileActions,
    private _redux: NgRedux<IAppState>,
    private _notificationService: NotificationService) {
    super();
    this.profileSubscription = this._redux.select<Profile>(['profile', 'profile'])
      .subscribe(p => {
        this.profile = Object.assign({}, p);
      });
  }

  ngOnInit() {
    this.addSub(this._notificationService.addStoreChangeSaveNotif<Profile>(['profile', 'profile'], p => `Profil sauvegardé`));
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  public saveProfile() {
    this._profileActions.dispatchUpdate(this.profile);
  }

  public createAdresse(address: Address) {
    this.profile.addresses.push(address);
    this._profileActions.dispatchUpdate(this.profile);
  }

  public saveAddress(address: Address) {
    this._profileActions.dispatchUpdate(this.profile);
  }

  public deleteAddress(address: Address) {
    this._profileActions.dispatchUpdate(this.profile);
  }

}
