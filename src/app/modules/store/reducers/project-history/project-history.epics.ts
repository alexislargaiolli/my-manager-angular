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
        super(HistoryEntry.name, _repo, _historyEntryActions);
    }

    @Epic()
    loadHistoryEntry = this.load;

    @Epic()
    createHistoryEntry = this.create;

    @Epic()
    projectSelect = (action$) => action$.ofType(SelectedProjectActions.SELECT_PROJECT)
        .map(action => this._historyEntryActions.load(action.payload.id));
}
