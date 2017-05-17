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
    error: null,
};

export function projectReducer(state: IModelList<Project> = INITIAL_STATE, action) {
    state = modelReducer<Project>(Project.name, state, action);

    return state;
}

// export function projectReducer(state: IModelList = INITIAL_STATE, action: IPayloadAction<any, any>) {
//     state = modelReducer<Project>(Project.name, state, action);
//     switch (action.type) {
//         case ProjectActions.PROJECT_CHANGE_STATE:
//             return {
//                 items: state.items.map(project => {
//                     if (project.id !== action.payload.id) {
//                         return project;
//                     }
//                     return Object.assign({}, project, { state: action.payload.state })
//                 }),
//                 loading: false,
//                 error: null
//             }
//     }
//     return state;
// }
