import { Component, OnInit } from '@angular/core';

import { Address } from 'app/models';
import { ModelUtils, RepositoriesService } from 'app/modules/core';
import { User } from 'app/modules/core/models/user.model';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { ProfilActions } from "app/modules/store";

@Component({
  templateUrl: './user-profile-general.component.html',
  styleUrls: ['./user-profile-general.component.css']
})
export class UserProfileGeneralComponent implements OnInit {

  @select(['profil', 'addresses', 'items'])
  public addresses$: Observable<Address[]>;

  @select(['profil', 'addresses', 'loading'])
  public loading$: Observable<boolean>;

  constructor(private _profilActions: ProfilActions) { }

  ngOnInit() {
  }

  public saveAddress(address: Address) {

  }

  public deleteAddress(address: Address) {

  }

}
