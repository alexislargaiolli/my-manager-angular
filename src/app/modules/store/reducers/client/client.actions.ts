import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Client, Address } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ClientActions extends ModelActions<Client> {

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Client.name)
    }

    public static readonly SELECT_CLIENT = 'SELECT_CLIENT';
    selectClient(clientId: number) {
        return {
            type: ClientActions.SELECT_CLIENT,
            payload: clientId
        }
    }

    public dispatchSelectClient(clientId: number) {
        this._ngRedux.dispatch(this.selectClient(clientId));
    }

    public static readonly UNSELECT_CLIENT = 'UNSELECT_CLIENT';
    unSelectClient() {
        return {
            type: ClientActions.UNSELECT_CLIENT
        }
    }

    public dispatchUnSelectClient() {
        this._ngRedux.dispatch(this.unSelectClient());
    }

    public static readonly CLIENT_ADD_ADDRESS = 'CLIENT_ADD_ADDRESS';
    addAddress(clientId: number, address: Address) {
        return {
            type: ClientActions.CLIENT_ADD_ADDRESS,
            payload: {
                clientId,
                address
            }
        }
    }
    public static readonly CLIENT_ADD_ADDRESS_SUCCESS = 'CLIENT_ADD_ADDRESS_SUCCESS';
    addAddressSuccess(clientId: number, address: Address) {
        return {
            type: ClientActions.CLIENT_ADD_ADDRESS_SUCCESS,
            payload: {
                clientId,
                address
            }
        }
    }

    public dispatchAddAddress(clientId: number, address: Address) {
        this._ngRedux.dispatch(this.addAddress(clientId, address));
    }

    public static readonly CLIENT_REMOVE_ADDRESS = 'CLIENT_REMOVE_ADDRESS';
    removeAddress(clientId: number, addressId: number) {
        return {
            type: ClientActions.CLIENT_REMOVE_ADDRESS,
            payload: {
                clientId,
                addressId
            }
        }
    }

    public static readonly CLIENT_REMOVE_ADDRESS_SUCCESS = 'CLIENT_REMOVE_ADDRESS_SUCCESS';
    removeAddressSuccess(clientId: number, addressId: number) {
        return {
            type: ClientActions.CLIENT_REMOVE_ADDRESS_SUCCESS,
            payload: {
                clientId,
                addressId
            }
        }
    }

    public dispatchRemoveAddress(clientId: number, addressId: number) {
        this._ngRedux.dispatch(this.removeAddress(clientId, addressId));
    }

}
