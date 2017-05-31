import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectTaskActions } from './project-task.actions';
import { RepositoriesService } from 'app/modules/core';
import { Task, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';

@Injectable()
export class ProjectTaskEpics extends ModelEpics<Task>{

    constructor(
        private _taskActions: ProjectTaskActions,
        protected _repo: RepositoriesService
    ) {
        super(Task.REPO_KEY, _repo, _taskActions);
    }

    @Epic()
    load = this.load;

    @Epic()
    create = this.create;

    @Epic()
    update = this.update;

    @Epic()
    delete = this.delete;

    @Epic()
    projectSelect = (action$) => action$.ofType(SelectedProjectActions.SELECT_PROJECT)
        .map(action => this._taskActions.load(action.payload.id));

}
