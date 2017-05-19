import { IProjectNoteState } from '../../store.types';
import { ProjectNoteActions } from './project-note.actions';
import { Note } from 'app/models';
import { modelReducer } from '../model/model.reducer';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null
};

export function projectNoteReducer(state: IProjectNoteState = INITIAL_STATE, action) {
    state = modelReducer<Note>(Note.name, Note.name, state, action);
    return state;
}
