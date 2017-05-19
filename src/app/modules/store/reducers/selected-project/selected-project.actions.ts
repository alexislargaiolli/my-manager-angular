import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { IAppState } from '../../store.types';
import { Project } from 'app/models';
import { ProjectActions } from '../project/project.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class SelectedProjectActions {

    constructor(protected _repo: RepositoriesService, private _ngRedux: NgRedux<IAppState>) { }

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

    public dispatchSelectProject(project: Project) {
        this._ngRedux.dispatch(this.selectProject(project));
    }

}