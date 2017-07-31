import { ModelActions } from 'app/modules/store/reducers/model/model.actions';
import { ActionUtils } from './../model/action.utils';
import { IProjectDevisState } from '../../store.types';
import { ProjectDevisActions } from './project-devis.actions';
import { Devis } from 'app/models';
import { modelReducer } from '../model/model.reducer';
import { IModelList } from 'app/modules/core';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null,
    skip: 0,
    limit: 10
};

export function projectDevisReducer(state: IProjectDevisState = INITIAL_STATE, action) {
    state = modelReducer<Devis>(Devis.REPO_KEY, Devis.REPO_KEY, state, action);
    return state;
}
