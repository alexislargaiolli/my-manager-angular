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
  private _client: Client;

  @Output()
  public delete: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  public save: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(private _ngRedux: NgRedux<IAppState>) {

  }

  public ngOnInit() { }

  public saveClient() {
    this.save.emit(this._client);
  }

  public addAddress(address) {
    this._client.addresses.push(address);
    this.saveClient();
  }

  public removeAddress(address) {
    ModelUtils.remove(this._client.addresses, address);
    this.saveClient();
  }

  get client() {
    return this._client;
  }

  @Input("client")
  set client(client: Client) {
    this._client = Object.assign({}, client);
    if (this._client.addresses == null) {
      this._client.addresses = [];
    }
  }
}
