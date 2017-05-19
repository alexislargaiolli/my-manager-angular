import { ProjectHistoryEntryActions } from './project-history.actions';
import { HistoryEntry } from 'app/models';
import { modelReducer } from '../model/model.reducer';
import { IModelList } from 'app/modules/core';
import { IProjectHistoryState } from '../../store.types';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null
};

export function projectHistoryEntryReducer(state: IProjectHistoryState = INITIAL_STATE, action) {
    state = modelReducer<HistoryEntry>(HistoryEntry.name, HistoryEntry.name, state, action);
    return state;
}
