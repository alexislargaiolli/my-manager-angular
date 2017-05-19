import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Client, Address } from 'app/models';
import { NotificationService } from 'app/modules/core';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { ClientActions } from '../../../../store/reducers/client/client.actions';
import { IAppState } from 'app/modules/store';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  @select(['clients', 'items'])
  public clients$: Observable<Client[]>;

  @select(['clients', 'boolean'])
  public loading$: Observable<boolean>;

  @select((state: IAppState) => state.clients.items.find(c => c.id === state.clients.selectedId))
  public selectedClient$: Observable<Client>;

  constructor(private _clientActions: ClientActions, private _ngRedux: NgRedux<IAppState>) { }

  public ngOnInit() { }

  public onSelectClient(client: Client) {
    this._clientActions.dispatchSelectClient(client.id);
  }

  public unselect() {
    this._clientActions.dispatchUnSelectClient();
  }

  public deleteClient(client: Client) {
    this._clientActions.dispatchDelete(client.id);
    this.unselect();
  }

  public createClient(client: Client) {
    this._clientActions.dispatchCreate(client);
  }

  public onUpdate(client: Client) {

  }

  public addAddress(address: Address) {
    this._clientActions.dispatchAddAddress(this._ngRedux.getState().clients.selectedId, address);
  }

  public removeAddress(address: Address) {
    this._clientActions.dispatchRemoveAddress(this._ngRedux.getState().clients.selectedId, address.id)
  }

}
