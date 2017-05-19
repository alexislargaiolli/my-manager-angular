import { Client } from 'app/models';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Address } from 'app/models';
import { ModelUtils } from 'app/modules/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailComponent implements OnInit {

  @Input()
  public client: Client;

  @Output()
  public delete: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  public save: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  public addAddress: EventEmitter<Address> = new EventEmitter<Address>();

  @Output()
  public removeAddress: EventEmitter<Address> = new EventEmitter<Address>();

  constructor(private _ngRedux: NgRedux<IAppState>) {

  }

  public ngOnInit() { }

  public saveClient() {
    this.save.emit(this.client);
  }

}
