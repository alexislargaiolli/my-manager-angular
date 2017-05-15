import { Client } from 'app/models';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Address } from 'app/models';
import { ClientService } from 'app/my-manager/services/client.service';
import { ModelUtils } from 'app/modules/core';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  public _client: Client;

  public addresses: Address[] = [];

  @Output()
  public onDelete: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  public onUpdate: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(private clientService: ClientService) { }

  public ngOnInit() {

  }

  private loadAddresses() {
    this.addresses = [];
    this.clientService.getAddresses(this.client).subscribe(addresses => this.addresses = addresses);
  }

  public delete() {
    this.clientService.delete(this.client).subscribe(c => {
      this.onDelete.emit(this.client);
    });
  }

  public update() {

    this.onUpdate.emit(this.client);
  }

  public saveAddress(address: Address) {
    this.clientService.saveAddress(this.client, address).subscribe(a => {
      ModelUtils.addOrUpdate(this.addresses, a);
    });
  }

  public deleteAddress(address: Address) {
    this.clientService.deleteAddress(this.client, address).subscribe(a => {
      ModelUtils.remove(this.addresses, address);
    });
  }

  get client(): Client {
    return this._client;
  }

  @Input('client')
  set client(client: Client) {
    this._client = client;
    this.loadAddresses();
  }

}
