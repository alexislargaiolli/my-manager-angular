import { ModelActions } from 'app/modules/store/reducers/model/model.actions';
import { ActionUtils } from './../model/action.utils';
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
    switch (action.type) {
        case ActionUtils.asyncActionType(Project.REPO_KEY, ModelActions.UPDATE, ActionUtils.SUCCESS): {
            return Object.assign({}, state, { items: updateProject(state.items, action.payload), loading: false, error: null, updating: false, lastUpdated: action.payload });
        }
        case ActionUtils.asyncActionType(Project.REPO_KEY, ModelActions.PATCH, ActionUtils.SUCCESS): {
            return Object.assign({}, state, { items: updateProject(state.items, action.payload), loading: false, error: null, updating: false, lastUpdated: action.payload });
        }
        case ProjectActions.SELECT_PROJECT: {
            return Object.assign({}, state, { selectedId: action.payload.projectId });
        }
        case ProjectActions.UPDATE_PROJECT_NOTES: {
            let project = state.items.find(p => p.id === action.payload.projectId);
            project = Object.assign(new Project(), project, { notes: action.payload.notes });
            return Object.assign({}, state, { items: ModelUtils.immutableUpdate<Project>(state.items, project) });
        }
    }
    state = modelReducer<Project>(Project.REPO_KEY, Project.REPO_KEY, state, action);
    return state;
}

/**
 * Update a project in project store but keep project.notes
 * @param projects 
 * @param project 
 */
function updateProject(projects: Project[], project: Project): Project[] {
    const i = projects.findIndex(a => a.id === project.id);
    const previous = projects[i];
    const p = Object.assign(new Project(), project);
    p.notes = previous.notes;
    return [
        ...projects.slice(0, i),
        p,
        ...projects.slice(i + 1)
    ];
}
