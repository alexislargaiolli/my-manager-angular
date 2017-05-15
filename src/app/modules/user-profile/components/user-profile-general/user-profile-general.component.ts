import { Component, OnInit } from '@angular/core';

import { Address } from 'app/models';
import { ModelUtils, CurrentSession, RepositoriesService } from 'app/modules/core';
import { User } from 'app/modules/core/models/user.model';

@Component({
  templateUrl: './user-profile-general.component.html',
  styleUrls: ['./user-profile-general.component.css']
})
export class UserProfileGeneralComponent implements OnInit {

  public addresses: Address[] = [];

  constructor(private currentSession: CurrentSession, private repo: RepositoriesService) { }

  ngOnInit() {
    this.repo.get<Address>(Address.name, null).byCurrentUser().exec().subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  public saveAddress(address: Address) {
    this.repo.save(Address.name, address).byCurrentUser().exec().subscribe(a => {
      ModelUtils.addOrUpdate(this.addresses, a);
    });
  }

  public deleteAddress(address: Address) {
    this.repo.delete(Address.name, address.id).byCurrentUser().exec().subscribe(a => {
      ModelUtils.remove(this.addresses, a);
    });
  }

}
