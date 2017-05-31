import { INoteState } from '../../store.types';
import { NoteActions } from './note.actions';
import { Note } from 'app/models';
import { modelReducer } from '../model/model.reducer';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null
};

export function noteReducer(state: INoteState = INITIAL_STATE, action) {

    state = modelReducer<Note>(Note.REPO_KEY, NoteActions.NOTE_SOURCE, state, action);
    return state;
}
