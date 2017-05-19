import { IModelList } from '../../../core/models/generic.model';
import { ProjectActions } from './project.actions';
import { RepositoriesService } from 'app/modules/core';
import { Project } from '../../../../models/project.model';
import { Action } from "redux";
import { IPayloadAction } from 'app/modules/core';
import { modelReducer } from '../model/model.reducer';

const INITIAL_STATE: IModelList<Project> = {
    items: [],
    loading: false,
    error: null
};

export function projectReducer(state: IModelList<Project> = INITIAL_STATE, action) {
    state = modelReducer<Project>(Project.name, Project.name, state, action);

    return state;
}
