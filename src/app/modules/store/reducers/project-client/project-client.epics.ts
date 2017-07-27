import { ProjectActions } from './../project/project.actions';
import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectClientActions } from './project-client.actions';
import { RepositoriesService } from 'app/modules/core';
import { Client, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { IAppState } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';
import { SessionActions } from 'app/modules/auth';
import { ActionUtils } from '../model/action.utils';

@Injectable()
export class ProjectClientEpics extends ModelEpics<Client> {

    constructor(
        protected _projectClientActions: ProjectClientActions,
        protected _repo: RepositoriesService
    ) {
        super(Client.REPO_KEY, _repo, _projectClientActions);
    }

    /**
     * Define the action source to use in event name. Default is model name.
     */
    protected getActionSource(): string {
        return ProjectClientActions.CLIENT_SOURCE;
    }

    @Epic()
    load = this.load;

    @Epic()
    protected addToProject = action$ => action$
        .ofType(ProjectClientActions.ADD_TO_PROJECT)
        .switchMap(action => {
            const request = this._repo.addRelation(this._modelName, action.payload.client).by(Project.REPO_KEY, action.payload.projectId);
            return request.exec()
                .map(model => this._modelAction.createSuccess(action.payload.client))
                .catch(error => of(this._modelAction.createError(error)))
        });

    @Epic()
    protected removeFromProject = action$ => action$
        .ofType(ProjectClientActions.REMOVE_FROM_PROJECT)
        .switchMap(action => {
            const request = this._repo.removeRelation(this._modelName, action.payload.clientId).by(Project.REPO_KEY, action.payload.projectId);
            return request.exec()
                .map(model => this._modelAction.deleteSuccess(action.payload.clientId))
                .catch(error => of(this._modelAction.deleteError(error)))
        });

    @Epic()
    projectSelect = (action$) => action$.ofType(ProjectActions.SELECT_PROJECT)
        .map(action => this._projectClientActions.load(action.payload.projectId));


}
