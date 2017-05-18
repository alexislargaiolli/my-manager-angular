import { ISelectedProjectState } from '../../store.types';
import { SelectedProjectActions } from './selected-project.actions';

const INITIAL_STATE = {
    id: null
};

export function selectedProjectReducer(state: ISelectedProjectState = INITIAL_STATE, action) {

    switch (action.type) {
        case SelectedProjectActions.SELECT_PROJECT: {
            return Object.assign({}, state, { id: action.payload.id });
        }
    }

    return state;
}
