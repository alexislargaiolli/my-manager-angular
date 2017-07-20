import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/modules/core';
import { Profile } from 'app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @select(['session', 'authenticated'])
  authenticated$: Observable<boolean>;

  @select(['profile', 'profile'])
  profile$: Observable<Profile>;

  @select(['dashboard', 'waitingDevis'])
  waitingDevis$: Observable<number>;

  @select(['dashboard', 'acceptedDevis'])
  acceptedDevis$: Observable<number>;

  @select(['dashboard', 'waitingInvoices'])
  waitingInvoices$: Observable<number>;

  @select(['dashboard', 'paidInvoices'])
  paidInvoices$: Observable<number>;

  constructor() { }

  ngOnInit() {
  }

}
