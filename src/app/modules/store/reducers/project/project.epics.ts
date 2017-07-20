import { RepositoryRequest } from './../../../core/services/repositories/repository-request';
import { Injectable } from '@angular/core';
import { ProjectActions } from './project.actions';
import { RepositoriesService } from 'app/modules/core';
import { Project } from 'app/models';
import { of } from 'rxjs/observable/of';
import { createEpicMiddleware } from 'redux-observable';
import { ModelEpics } from '../model/model.epics';
import { Epic } from 'redux-observable-decorator';
import { UPDATE_LOCATION } from '@angular-redux/router/lib/es5';
import { Observable } from 'rxjs/Observable';
import { SelectedProjectActions } from '../selected-project/selected-project.actions';
import { SessionActions } from 'app/modules/auth';
import { ModelActions } from '../model/model.actions';
import { ActionUtils } from '../model/action.utils';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';

@Injectable()
export class ProjectEpics extends ModelEpics<Project> {

    @Epic()
    loadProject = this.load;

    @Epic()
    createProject = this.create;

    @Epic()
    updateProject = this.update;

    @Epic()
    deleteProject = this.delete;

    constructor(
        protected _repo: RepositoriesService,
        protected _projectActions: ProjectActions,
        protected _redux: NgRedux<IAppState>,
        private _selectedProjectActions: SelectedProjectActions
    ) {
        super(Project.REPO_KEY, _repo, _projectActions);
    }

    @Epic()
    onProjectCreated = (action$) => action$.ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.CREATE, ActionUtils.SUCCESS))
        .map(action => { return { type: UPDATE_LOCATION, payload: `project/${action.payload.id}` }; });

    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => this._projectActions.load());

    @Epic()
    updateState = action$ => action$.ofType(ProjectActions.UPDATE_STATE)
        .map(action => this._projectActions.update(Object.assign({}, action.payload.project, { state: action.payload.state })));

    @Epic()
    updateProgress = action$ => action$.ofType(ProjectActions.UPDATE_PROGRESS)
        .map(action => {
            const index = this._redux.getState().projects.items.findIndex(p => p.id === action.payload.projectId);
            const project = this._redux.getState().projects.items[index];
            const updatedProject = Object.assign({}, project, { progress: action.payload.progress });
            return this._projectActions.update(updatedProject);
        })

    protected loadRequest(request: RepositoryRequest<Project>) {
        request.include('notes');
    }
}
