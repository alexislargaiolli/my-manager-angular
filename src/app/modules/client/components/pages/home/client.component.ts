import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { Client, Address } from 'app/models';
import { NotificationService } from 'app/modules/core';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { ClientActions } from '../../../../store/reducers/client/client.actions';
import { IAppState } from 'app/modules/store';
import { slideApparitionAnimation, rightSlideApparitionAnimation, centerApparitionAnimation } from 'app/animations';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: [slideApparitionAnimation, rightSlideApparitionAnimation, centerApparitionAnimation]
})
export class ClientComponent implements OnInit {

  @HostBinding('class') containerClasses = 'd-flex flex-column flex-sm-row';

  @select(['clients', 'items'])
  public clients$: Observable<Client[]>;

  @select(['clients', 'boolean'])
  public loading$: Observable<boolean>;

  @select(ClientActions.findSelectedClient)
  public selectedClient$: Observable<Client>;

  public selected: Client;

  constructor(private _clientActions: ClientActions, private _ngRedux: NgRedux<IAppState>) { }

  public ngOnInit() { }

  public onSelectClient(client: Client) {
    this.selected = Object.assign({}, client);
  }

  public unselect() {
    this.selected = null;
  }

  public deleteClient(client: Client) {
    this._clientActions.dispatchDelete(client);
    this.unselect();
  }

  public createClient() {
    this._clientActions.dispatchCreate({ name: 'Nouveau client' });
  }

  public onUpdate(client: Client) {
    this._clientActions.dispatchUpdate(client);
  }
}
