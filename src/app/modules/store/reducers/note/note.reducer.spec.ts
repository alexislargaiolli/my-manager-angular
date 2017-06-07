import { noteReducer } from './note.reducers';
import { NoteActions } from './note.actions';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';
import { Note } from 'app/models';
describe('noteReducer', () => {

    it('should add note', () => {
        const state = { items: [], loading: false, error: null };
        const action = { type: ActionUtils.asyncActionType(NoteActions.NOTE_SOURCE, ModelActions.CREATE, ActionUtils.SUCCESS), payload: { priority: 1 } };
        const newState = noteReducer(state, action);
        expect(newState.items.length).toBe(1);
    });

    it('should add note ordered by priority ', () => {
        const notes: Note[] = [];
        let note = new Note();
        note.id = 1;
        note.priority = 1;
        notes.push(note);
        note = new Note();
        note.id = 2;
        note.priority = 0;
        notes.push(note);
        const state = { items: notes, loading: false, error: null };
        // 1 - 2
        let action = { type: ActionUtils.asyncActionType(NoteActions.NOTE_SOURCE, ModelActions.CREATE, ActionUtils.SUCCESS), payload: { id: 3, priority: 2 } };
        // 3 - 1 - 2
        let newState = noteReducer(state, action);
        expect(newState.items.length).toBe(3);
        expect(newState.items[0].id).toBe(3);

        action = { type: ActionUtils.asyncActionType(NoteActions.NOTE_SOURCE, ModelActions.CREATE, ActionUtils.SUCCESS), payload: { id: 4, priority: 1 } };
        // 3 - 1 - 4 - 2
        newState = noteReducer(newState, action);
        expect(newState.items.length).toBe(4);
        expect(newState.items[0].id).toBe(3);
        expect(newState.items[1].id).toBe(1);
        expect(newState.items[2].id).toBe(4);
    });
});
