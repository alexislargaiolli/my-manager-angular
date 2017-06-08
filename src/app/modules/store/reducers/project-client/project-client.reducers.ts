import { IClientState, IProjectClientState } from '../../store.types';
import { ProjectClientActions } from './project-client.actions';
import { Client } from 'app/models';
import { modelReducer } from '../model/model.reducer';
import { IModelList } from 'app/modules/core';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null
};

export function projectClientReducer(state: IProjectClientState = INITIAL_STATE, action) {
    switch (action.type) {
        case ProjectClientActions.ADD_TO_PROJECT:
            return Object.assign({}, state, { loading: true, error: null });
        case ProjectClientActions.REMOVE_FROM_PROJECT:
            return Object.assign({}, state, { loading: true, error: null });
    }
    state = modelReducer<Client>(Client.REPO_KEY, ProjectClientActions.CLIENT_SOURCE, state, action);
    return state;
}
