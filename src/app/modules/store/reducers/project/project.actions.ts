import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Project, Client } from 'app/models';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store.types';
import { ModelActions } from '../model/model.actions';
import { ProjectState } from 'app/models';

@Injectable()
export class ProjectActions extends ModelActions<Project> {

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Project.REPO_KEY);
    }

    public static findProject(state: IAppState, projectId) {
        return state.projects.items.find(p => p.id == projectId);
    }

    public static readonly UPDATE_STATE = 'UPDATE_STATE';
    updateState(project: Project, state: ProjectState) {
        return {
            type: ProjectActions.UPDATE_STATE,
            payload: { state, project }
        };
    }

    public static readonly UPDATE_PROGRESS = 'UPDATE_PROGRESS';
    updateProgress(projectId: number, progress: number) {
        return {
            type: ProjectActions.UPDATE_PROGRESS,
            payload: { progress, projectId }
        };
    }

    public dispatchUpdateState(project: Project, state: ProjectState) {
        this._ngRedux.dispatch(this.updateState(project, state));
    }

    public dispatchUpdateProgress(projectId: number, progress: number) {
        this._ngRedux.dispatch(this.updateProgress(projectId, progress));
    }

}
