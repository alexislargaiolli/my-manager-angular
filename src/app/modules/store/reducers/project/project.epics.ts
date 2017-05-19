import { Injectable } from '@angular/core';
import { ProjectActions } from './project.actions';
import { RepositoriesService } from 'app/modules/core';
import { Project } from 'app/models';
import { of } from 'rxjs/observable/of';
import { createEpicMiddleware } from 'redux-observable';
import { ModelEpics } from '../model/model.epics';
import { Epic } from 'redux-observable-decorator';
import { UPDATE_LOCATION } from "@angular-redux/router/lib/es5";
import { Observable } from 'rxjs/Observable';
import { SelectedProjectActions } from '../selected-project/selected-project.actions';
import { SessionActions } from 'app/modules/auth';

@Injectable()
export class ProjectEpics extends ModelEpics<Project>{

    constructor(
        protected _repo: RepositoriesService,
        protected _projectActions: ProjectActions,
    ) {
        super(Project.name, _repo, _projectActions);
    }

    @Epic()
    loadProject = this.load;

    @Epic()
    createProject = this.create;

    @Epic()
    updateProject = this.update;

    @Epic()
    deleteProject = this.delete;


    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => this._projectActions.load());

    @Epic()
    updateState = action$ => action$.ofType(ProjectActions.UPDATE_STATE)
        .map(action => this._projectActions.update(Object.assign({}, action.payload.project, { state: action.payload.state })));
}
