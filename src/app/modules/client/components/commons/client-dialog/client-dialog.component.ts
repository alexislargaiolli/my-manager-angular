import { ClientActions } from './../../../../store/reducers/client/client.actions';
import { Client } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {

  @select(['clients', 'items'])
  public clients$: Observable<Client[]>;

  @select(['clients', 'boolean'])
  public loading$: Observable<boolean>;

  public selected: Client;

  constructor(private _clientActions: ClientActions) { }

  ngOnInit() {
  }

  public onSelectClient(client: Client) {
    this.selected = client;
  }

  public unselect() {
    this.selected = null;
  }

  public deleteClient(client: Client) {
    this._clientActions.dispatchDelete(client);
    this.unselect();
  }

  public createClient() {
    // this._clientActions.dispatchCreate({ name: 'Nouveau client' });
    this.selected = new Client();
  }

  public onUpdate(client: Client) {
    this._clientActions.dispatchSave(client);
  }
}
