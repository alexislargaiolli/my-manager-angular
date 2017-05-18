import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { IAppState } from '../../store.types';
import { Project } from 'app/models';
import { ProjectActions } from '../project/project.actions';

@Injectable()
export class SelectedProjectActions {

    constructor(protected _repo: RepositoriesService) { }

    /**
     * Utils method to get current project with @select(SelectedProjectActions.currentProject)
     * @param state 
     */
    public static currentProject(state: IAppState) {
        let currentId = state.selectedProject.id;
        return ProjectActions.findProject(state, currentId);
    }

    public static readonly SELECT_PROJECT = 'SELECT_PROJECT';
    selectProject(project: Project) {
        return {
            type: SelectedProjectActions.SELECT_PROJECT,
            payload: project
        }
    }

}
