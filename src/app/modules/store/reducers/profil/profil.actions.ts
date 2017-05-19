import { Injectable } from '@angular/core';
import { RepositoriesService, User } from 'app/modules/core';
import { Address } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProfilActions {

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) { }

    public static readonly LOAD_ADDRESSES_REQUEST = 'LOAD_ADDRESSES_REQUEST';
    loadAddresses() {
        return {
            type: ProfilActions.LOAD_ADDRESSES_REQUEST,
        }
    }

    public static readonly LOAD_ADDRESSES_SUCCESS = 'LOAD_ADDRESSES_SUCCESS';
    loadAddressesSuccess(addresses: Address[]) {
        return {
            type: ProfilActions.LOAD_ADDRESSES_SUCCESS,
            payload: addresses
        }
    }

    public static readonly LOAD_ADDRESSES_ERROR = 'LOAD_ADDRESSES_ERROR';
    loadAddressesError(error) {
        return {
            type: ProfilActions.LOAD_ADDRESSES_ERROR,
            payload: error
        }
    }

    public static readonly USER_ADD_ADDRESS = 'USER_ADD_ADDRESS';
    addAddress(userId: number, address: Address) {
        return {
            type: ProfilActions.USER_ADD_ADDRESS,
            payload: {
                userId,
                address
            }
        }
    }
    public static readonly USER_ADD_ADDRESS_SUCCESS = 'USER_ADD_ADDRESS_SUCCESS';
    addAddressSuccess(userId: number, address: Address) {
        return {
            type: ProfilActions.USER_ADD_ADDRESS_SUCCESS,
            payload: {
                userId,
                address
            }
        }
    }

    public dispatchAddAddress(userId: number, address: Address) {
        this._ngRedux.dispatch(this.addAddress(userId, address));
    }

    public static readonly USER_REMOVE_ADDRESS = 'USER_REMOVE_ADDRESS';
    removeAddress(userId: number, addressId: number) {
        return {
            type: ProfilActions.USER_REMOVE_ADDRESS,
            payload: {
                userId,
                addressId
            }
        }
    }

    public static readonly USER_REMOVE_ADDRESS_SUCCESS = 'USER_REMOVE_ADDRESS_SUCCESS';
    removeAddressSuccess(userId: number, addressId: number) {
        return {
            type: ProfilActions.USER_REMOVE_ADDRESS_SUCCESS,
            payload: {
                userId,
                addressId
            }
        }
    }

    public dispatchRemoveAddress(userId: number, addressId: number) {
        this._ngRedux.dispatch(this.removeAddress(userId, addressId));
    }

}
