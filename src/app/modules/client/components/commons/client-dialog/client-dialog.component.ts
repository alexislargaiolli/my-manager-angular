import { DialogsService } from './../../../../core/services/dialog.service';
import { ClientActions } from './../../../../store/reducers/client/client.actions';
import { Client } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/modules/core/services/notification.service';
import { ReduxSubscriptionComponent } from 'app/modules/core/components/redux-subscription-component/redux-subscription-component';
import { IAppState } from 'app/modules/store/store.types';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent extends ReduxSubscriptionComponent implements OnInit {

  @select(['clients', 'items'])
  public clients$: Observable<Client[]>;

  @select(['clients', 'lastCreated'])
  public lastCreated$: Observable<Client>;

  @select(['clients', 'boolean'])
  public loading$: Observable<boolean>;

  public selected: Client;

  constructor(
    private _clientActions: ClientActions,
    private _notificationServe: NotificationService,
    private _ngRedux: NgRedux<IAppState>,
    private _dialogsService: DialogsService
  ) {
    super();
  }

  ngOnInit() {
    this.addSub(this._ngRedux.select(['clients', 'lastCreated']).subscribe((client: Client) => {
      if (client) {
        this._notificationServe.addCreateSuccess(`Nouveau client ${client.name} créé`);
      }
    }));

    this.addSub(this._ngRedux.select(['clients', 'lastUpdated']).subscribe((client: Client) => {
      if (client) {
        this._notificationServe.addSaveSuccess(`${client.name} sauvegardé`);
      }
    }));

    this.addSub(this._ngRedux.select(['clients', 'lastDeleted']).subscribe((client: Client) => {
      if (client) {
        this._notificationServe.addRemoveSuccess(`${client.name} supprimé`);
      }
    }));
  }

  public onSelectClient(client: Client) {
    this.selected = client;
  }

  public unselect() {
    this.selected = null;
  }

  public deleteClient(client: Client) {
    this._dialogsService.confirm('Confirmation', `Supprimer ${client.name} ?`).subscribe(confirmed => {
      this._clientActions.dispatchDelete(client);
      this.unselect();
    });
  }

  public createClient() {
    // this._clientActions.dispatchCreate({ name: 'Nouveau client' });
    this.selected = new Client();
  }

  public onUpdate(client: Client) {
    this._clientActions.dispatchSave(client);
  }
}
