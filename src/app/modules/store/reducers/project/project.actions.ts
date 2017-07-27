import { Note } from './../../../../models/note.model';
import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Project, Client } from 'app/models';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store.types';
import { ModelActions } from '../model/model.actions';
import { ProjectState } from 'app/models';

@Injectable()
export class ProjectActions extends ModelActions<Project> {
    public static readonly UPDATE_STATE = 'UPDATE_STATE';
    public static readonly UPDATE_PROGRESS = 'UPDATE_PROGRESS';
    public static readonly SELECT_PROJECT = 'SELECT_PROJECT';
    public static readonly UPDATE_PROJECT_NOTES = 'UPDATE_PROJECT_NOTES';

    /**
     * Utils method to get current project with @select(ProjectActions.currentProject)
     * @param state
     */
    public static currentProject(state: IAppState): Project {
        const currentId = state.projects.selectedId;
        return ProjectActions.findProject(state, currentId);
    }

    public static findProject(state: IAppState, projectId) {
        return state.projects.items.find(p => p.id === projectId);
    }

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Project.REPO_KEY);
    }

    updateState(project: Project, state: ProjectState) {
        return {
            type: ProjectActions.UPDATE_STATE,
            payload: { state, project }
        };
    }

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

    public selectProject(projectId: number) {
        return {
            type: ProjectActions.SELECT_PROJECT,
            payload: {
                projectId
            }
        };
    }

    public dispatchSelectProject(projectId: number) {
        this._ngRedux.dispatch(this.selectProject(projectId));
    }

    public updateNotes(projectId: number, notes: Note[]) {
        return {
            type: ProjectActions.UPDATE_PROJECT_NOTES,
            payload: {
                projectId,
                notes
            }
        };
    }

    public dispatchUpdateNotes(projectId: number, notes: Note[]) {
        this._ngRedux.dispatch(this.updateNotes(projectId, notes));
    }

}
