import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectTaskActions } from './project-task.actions';
import { RepositoriesService } from 'app/modules/core';
import { Task, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions, IAppState, ProjectActions } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';
import { TaskState } from '../../../../models/task.model';

@Injectable()
export class ProjectTaskEpics extends ModelEpics<Task>{

    constructor(
        private _taskActions: ProjectTaskActions,
        private _projectActions: ProjectActions,
        private _ngRedux: NgRedux<IAppState>,
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

    @Epic()
    updateProgress = (action$) => action$.ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.UPDATE, ActionUtils.SUCCESS))
        .map(action => {
            const nbFinishedTasks = this._ngRedux.getState().projectTasks.items.reduce((previousValue, currentTask) => previousValue + (currentTask.state === 2 ? 1 : 0), 0);
            const totalTask = this._ngRedux.getState().projectTasks.items.length;
            const progress = Math.floor((nbFinishedTasks * 100) / totalTask);
            return this._projectActions.updateProgress(action.payload.projectId, progress);
        });

}
