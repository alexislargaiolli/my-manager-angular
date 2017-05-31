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
    state = modelReducer<Client>(Client.REPO_KEY, ProjectClientActions.CLIENT_SOURCE, state, action);
    return state;
}
