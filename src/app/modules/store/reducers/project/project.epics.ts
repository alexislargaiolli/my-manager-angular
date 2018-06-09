import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Project } from 'app/models';
import { SessionActions } from 'app/modules/auth';
import { RepositoriesService } from 'app/modules/core';
import { IAppState } from 'app/modules/store';
import { Epic } from 'redux-observable-decorator';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';
import { ModelEpics } from '../model/model.epics';
import { RepositoryRequest } from './../../../core/services/repositories/repository-request';
import { ProjectActions } from './project.actions';
import { UPDATE_LOCATION } from '@angular-redux/router';

@Injectable()
export class ProjectEpics extends ModelEpics<Project> {

    @Epic()
    loadProject = this.load;

    @Epic()
    createProject = this.create;

    @Epic()
    updateProject = this.update;

    @Epic()
    patchProject = this.patch;

    @Epic()
    deleteProject = this.delete;

    constructor(
        protected _repo: RepositoriesService,
        protected _projectActions: ProjectActions,
        protected _redux: NgRedux<IAppState>
    ) {
        super(Project.REPO_KEY, _repo, _projectActions);
    }

    @Epic()
    onProjectCreated = (action$) => action$.ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.CREATE, ActionUtils.SUCCESS))
        .map(action => { return { type: UPDATE_LOCATION, payload: `project/${action.payload.id}` }; });

    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => this._projectActions.load());

    protected loadRequest(request: RepositoryRequest<Project>) {
        request.include('notes');
    }
}
