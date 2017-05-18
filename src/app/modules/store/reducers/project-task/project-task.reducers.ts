import { IProjectTaskState } from '../../store.types';
import { ProjectTaskActions } from './project-task.actions';
import { modelReducer } from '../model/model.reducer';
import { Task } from 'app/models';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null
};

export function projectTaskReducer(state: IProjectTaskState = INITIAL_STATE, action) {
    state = modelReducer<Task>(Task.name, state, action);

    return state;
}
