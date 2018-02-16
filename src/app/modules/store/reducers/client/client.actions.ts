import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Client, Address } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ClientActions extends ModelActions<Client> {

    public static readonly SELECT_CLIENT = 'SELECT_CLIENT';
    public static readonly UNSELECT_CLIENT = 'UNSELECT_CLIENT';
    public static readonly ADD_ADDRESS = 'ADD_ADDRESS';
    
    public static findSelectedClient(state: IAppState) {
        return state.clients.items.find(c => c.id === state.clients.selectedId);
    }

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Client.REPO_KEY);
    }


    public selectClient(clientId: number) {
        return {
            type: ClientActions.SELECT_CLIENT,
            payload: clientId
        };
    }

    public dispatchSelectClient(clientId: number) {
        this._ngRedux.dispatch(this.selectClient(clientId));
    }

    public unSelectClient() {
        return {
            type: ClientActions.UNSELECT_CLIENT
        };
    }

    public dispatchUnSelectClient() {
        this._ngRedux.dispatch(this.unSelectClient());
    }

}
