import { RepositoriesService } from 'app/core/services/repositories/repositories.service';
import { Component, OnInit } from '@angular/core';

import { CurrentSession } from 'app/core/services/session.service';
import { Address } from 'app/models';
import { ModelUtils } from 'app/core';
import { User } from 'app/core/models/user.model';

@Component({
  selector: 'app-user-profil-general',
  templateUrl: './user-profil-general.component.html',
  styleUrls: ['./user-profil-general.component.css']
})
export class UserProfilGeneralComponent implements OnInit {

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
