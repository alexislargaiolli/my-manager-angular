import { INoteState } from '../../store.types';
import { NoteActions } from './note.actions';
import { Note } from 'app/models';
import { modelReducer } from '../model/model.reducer';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null
};

export function noteReducer(state: INoteState = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionUtils.asyncActionType(NoteActions.NOTE_SOURCE, ModelActions.CREATE, ActionUtils.SUCCESS):
            const eltToAdd = action.payload;
            //Insert by priority order
            let index = state.items.findIndex((item) => item.priority < eltToAdd.priority);
            if (index < 1) {
                index = 0;
            }
            const newItems = [...state.items.slice(0, index), action.payload, ...state.items.slice(index)]
            return Object.assign({}, state, { items: newItems, loading: false, error: null });
    }
    state = modelReducer<Note>(Note.REPO_KEY, NoteActions.NOTE_SOURCE, state, action);
    return state;
}
