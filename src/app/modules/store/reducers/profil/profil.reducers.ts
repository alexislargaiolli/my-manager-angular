import { IProfilState } from '../../store.types';
import { ProfilActions } from './profil.actions';
import { modelReducer } from '../model/model.reducer';
import { IModelList, ModelUtils, User } from 'app/modules/core';
import { ModelActions } from '../model/model.actions';
import { Address } from 'app/models';

const INITIAL_STATE = {
    addresses: {
        items: [],
        loading: false,
        error: null
    }
};

export function profilReducer(state: IProfilState = INITIAL_STATE, action) {
    switch (action.type) {
        case ProfilActions.LOAD_ADDRESSES_REQUEST:
            return Object.assign({}, state, { addresses: { loading: true, items: [], error: null } });

        case ProfilActions.LOAD_ADDRESSES_SUCCESS:
            return Object.assign({}, state, { addresses: { items: action.payload, loading: false } });

        case ProfilActions.LOAD_ADDRESSES_ERROR:
            return Object.assign({}, state, { addresses: { items: [], loading: false, error: action.payload } });

        case ProfilActions.USER_ADD_ADDRESS_SUCCESS:
            let addresses = Object.assign({}, state.addresses, { items: ModelUtils.immutableUpdate<Address>(state.addresses.items, action.payload.address), loading: false, error: null });
            return Object.assign({}, state, { addresses: addresses });

        case ProfilActions.USER_REMOVE_ADDRESS_SUCCESS:
            addresses = Object.assign({}, state.addresses, { items: ModelUtils.immutableRemove<Address>(state.addresses.items, action.payload.addressId) });
            return Object.assign({}, state, { addresses: addresses });

    }
    return state;
}
