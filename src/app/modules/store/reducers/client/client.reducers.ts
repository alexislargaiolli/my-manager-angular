import { IClientState } from '../../store.types';
import { ClientActions } from './client.actions';
import { Client } from 'app/models';
import { modelReducer } from '../model/model.reducer';
import { IModelList, ModelUtils } from 'app/modules/core';
import { ModelActions } from '../model/model.actions';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null,
    selectedId: null
};

export function clientReducer(state: IClientState = INITIAL_STATE, action) {
    state = modelReducer<Client>(Client.name, Client.name, state, action);
    switch (action.type) {
        case ClientActions.SELECT_CLIENT:
            return Object.assign({}, state, { selectedId: action.payload });

        case ClientActions.UNSELECT_CLIENT:
            return Object.assign({}, state, { selectedId: null });

        case ClientActions.CLIENT_ADD_ADDRESS_SUCCESS:
            const i = state.items.findIndex(a => a.id === action.payload.clientId);
            const client = Object.assign({}, state.items[i], { addresses: state.items[i].addresses.concat(action.payload.address) });
            return Object.assign({}, state, { items: ModelUtils.immutableUpdate<Client>(state.items, client), loading: false, error: null });

        case ClientActions.CLIENT_REMOVE_ADDRESS_SUCCESS:
            const clientIndex = state.items.findIndex(a => a.id === action.payload.clientId);
            const c = Object.assign({}, state.items[clientIndex], { addresses: ModelUtils.immutableRemove(state.items[clientIndex].addresses, action.payload.addressId) });
            return Object.assign({}, state, {
                items: ModelUtils.immutableUpdate<Client>(state.items, c), loading: false, error: null
            });

    }
    return state;
}
