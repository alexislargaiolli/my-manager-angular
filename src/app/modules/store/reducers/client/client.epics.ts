import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ClientActions } from './client.actions';
import { RepositoriesService } from 'app/modules/core';
import { Client, Project, Address } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions, IAppState } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';
import { SessionActions } from 'app/modules/auth';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';

@Injectable()
export class ClientEpics extends ModelEpics<Client> {

    constructor(
        protected _clientActions: ClientActions,
        protected _repo: RepositoriesService
    ) {
        super(Client.name, _repo, _clientActions);
    }

    @Epic()
    load = action$ => action$
        .ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.LOAD, ActionUtils.REQUEST))
        .switchMap((action) => {
            const request = this._repo.get(this._modelName, null).byCurrentUser().include('addresses');
            return request.exec()
                .map(models => this._clientActions.loadSuccess(models))
                .catch(error => of(this._clientActions.loadError(error)))
        });

    @Epic()
    create = this.create;

    @Epic()
    update = this.update;

    @Epic()
    delete = this.delete;

    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => this._clientActions.load());

    @Epic()
    addAddress = action$ => action$
        .ofType(ClientActions.CLIENT_ADD_ADDRESS)
        .switchMap((action) => {
            const request = this._repo.create<Client>(Address.name, action.payload.address).by(Client.name, action.payload.clientId).include('addresses');
            return request.exec()
                .map(models => this._clientActions.addAddressSuccess(action.payload.clientId, action.payload.address))
                .catch(error => of(this._clientActions.updateError(error)))
        });

    @Epic()
    removeAddress = action$ => action$
        .ofType(ClientActions.CLIENT_REMOVE_ADDRESS)
        .switchMap((action) => {
            const request = this._repo.delete<Client>(Address.name, action.payload.addressId).by(Client.name, action.payload.clientId).include('addresses');
            return request.exec()
                .map(models => this._clientActions.removeAddressSuccess(action.payload.clientId, action.payload.addressId))
                .catch(error => of(this._clientActions.deleteError(error)))
        });

}
