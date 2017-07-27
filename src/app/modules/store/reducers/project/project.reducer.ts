import { ModelUtils } from './../../../core/models/model.utils';
import { IProjectState } from './../../store.types';
import { IModelList } from '../../../core/models/generic.model';
import { ProjectActions } from './project.actions';
import { RepositoriesService } from 'app/modules/core';
import { Project } from '../../../../models/project.model';
import { IPayloadAction } from 'app/modules/core';
import { modelReducer } from '../model/model.reducer';

const INITIAL_STATE: IProjectState = {
    items: [],
    loading: false,
    error: null,
    skip: 0,
    limit: 10
};

export function projectReducer(state: IProjectState = INITIAL_STATE, action) {
    state = modelReducer<Project>(Project.REPO_KEY, Project.REPO_KEY, state, action);
    switch (action.type) {
        case ProjectActions.SELECT_PROJECT: {
            return Object.assign({}, state, { selectedId: action.payload.projectId });
        }
        case ProjectActions.UPDATE_PROJECT_NOTES: {
            let project = state.items.find(p => p.id === action.payload.projectId);
            project = Object.assign(new Project(), project, { notes: action.payload.notes });
            return Object.assign({}, state, { items: ModelUtils.immutableUpdate<Project>(state.items, project) });
        }
    }
    return state;
}
