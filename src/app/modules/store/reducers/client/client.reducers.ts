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
    state = modelReducer<Client>(Client.REPO_KEY, Client.REPO_KEY, state, action);
    switch (action.type) {
        case ClientActions.SELECT_CLIENT:
            return Object.assign({}, state, { selectedId: action.payload });

        case ClientActions.UNSELECT_CLIENT:
            return Object.assign({}, state, { selectedId: null });

    }
    return state;
}
