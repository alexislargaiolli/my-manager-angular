import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectHistoryEntryActions } from './project-history.actions';
import { RepositoriesService } from 'app/modules/core';
import { HistoryEntry, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';

@Injectable()
export class ProjectHistoryEntryEpics extends ModelEpics<HistoryEntry>{

    constructor(
        private _historyEntryActions: ProjectHistoryEntryActions,
        protected _repo: RepositoriesService
    ) {
        super(HistoryEntry.REPO_KEY, _repo, _historyEntryActions);
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
        .map(action => this._historyEntryActions.load(action.payload.id));
}
