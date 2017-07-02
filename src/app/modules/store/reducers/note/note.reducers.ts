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
            //Search first element with lower priority
            let index = state.items.findIndex((item) => item.priority < eltToAdd.priority);
            let newItems;
            //If found, insert just before
            if (index != -1) {
                newItems = [...state.items.slice(0, index), action.payload, ...state.items.slice(index)]
            }
            else {
                //If not found, insert at the end 
                newItems = state.items.concat(action.payload);
            }
            return Object.assign({}, state, { items: newItems, loading: false, error: null });
    }
    state = modelReducer<Note>(Note.REPO_KEY, NoteActions.NOTE_SOURCE, state, action);
    return state;
}
