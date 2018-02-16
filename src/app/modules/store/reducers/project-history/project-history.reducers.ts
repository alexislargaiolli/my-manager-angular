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
            let items = null;
            const index = state.items.findIndex(entry => entry.date < action.payload.date);
            if (index !== -1 && state.items.length > 1) {
                items = ModelUtils.immutableInsert(state.items, action.payload, index);
                // items = [...state.items.slice(0, index), action.payload, ...state.items.slice(index)];
            } else {
                items = [...state.items, action.payload];
            }
            // const items = ModelUtils.immutableInsert(state.items, action.payload, 0);
            // items.sort((a: HistoryEntry, b: HistoryEntry) => a.date > b.date);
            return Object.assign({}, state, { items: items, loading: false, error: null });

        case ActionUtils.asyncActionType(HistoryEntry.REPO_KEY, ModelActions.LOAD, ActionUtils.SUCCESS):
            return Object.assign({}, state, { items: action.payload, loading: false });

        case ActionUtils.asyncActionType(HistoryEntry.REPO_KEY, ModelActions.LOAD_MORE, ActionUtils.SUCCESS):
            return Object.assign({}, state, { loading: false, error: null, items: [...state.items, ...action.payload] });
    }
    state = modelReducer<HistoryEntry>(HistoryEntry.REPO_KEY, HistoryEntry.REPO_KEY, state, action);
    return state;
}
