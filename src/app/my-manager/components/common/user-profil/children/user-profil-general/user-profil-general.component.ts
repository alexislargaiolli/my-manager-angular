import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import { CurrentSession } from 'app/core/services/session.service';
import { Address } from 'app/my-manager/model/address.model';
import { ModelUtils } from 'app/core/generics/models/model.utils';

@Component({
  selector: 'app-user-profil-general',
  templateUrl: './user-profil-general.component.html',
  styleUrls: ['./user-profil-general.component.css']
})
export class UserProfilGeneralComponent implements OnInit {

  public addresses: Address[] = [];

  constructor(private currentSession: CurrentSession, private userService: UserService) { }

  ngOnInit() {
    this.userService.getAddresses(this.currentSession.userId).subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  public saveAddress(address: Address) {
    this.userService.saveAddress(this.currentSession.userId, address).subscribe(a => {
      ModelUtils.addOrUpdate(this.addresses, a);
    });
  }

  public deleteAddress(address: Address) {
    this.userService.deleteAddress(this.currentSession.userId, address).subscribe(a => {
      ModelUtils.remove(this.addresses, address);
    });
  }

}
