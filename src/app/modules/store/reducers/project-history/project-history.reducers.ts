import { ProjectHistoryEntryActions } from './project-history.actions';
import { HistoryEntry } from 'app/models';
import { modelReducer } from '../model/model.reducer';
import { IModelList } from 'app/modules/core';
import { IProjectHistoryState } from '../../store.types';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';
import { ModelUtils } from '../../../core/models/model.utils';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null,
    skip: 0,
    limit: 10
};

export function projectHistoryEntryReducer(state: IProjectHistoryState = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionUtils.asyncActionType(HistoryEntry.REPO_KEY, ModelActions.CREATE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: ModelUtils.immutableInsert(state.items, action.payload, 0), loading: false, error: null });
    }
    state = modelReducer<HistoryEntry>(HistoryEntry.REPO_KEY, HistoryEntry.REPO_KEY, state, action);
    return state;
}
