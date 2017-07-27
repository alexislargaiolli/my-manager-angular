import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectDevisActions } from './project-devis.actions';
import { RepositoriesService } from 'app/modules/core';
import { Devis, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { IAppState, ProjectActions } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';
import { ModelActions } from '../model/model.actions';
import { ActionUtils } from '../model/action.utils';
import { ProjectHistoryEntryActions } from '../project-history/project-history.actions';
import { HistoryEntry } from '../../../../models/historyentry.model';
import { HistoryEntryFactory } from "app/models/historyentry.factory";

@Injectable()
export class ProjectDevisEpics extends ModelEpics<Devis> {

    constructor(
        protected _devisActions: ProjectDevisActions,
        protected _historyActions: ProjectHistoryEntryActions,
        protected _repo: RepositoriesService
    ) {
        super(Devis.REPO_KEY, _repo, _devisActions);
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
    loadOnProjectSelection = (action$) => action$.ofType(ProjectActions.SELECT_PROJECT)
        .map(action => this._devisActions.load(action.payload.projectId));

    @Epic()
    createHistoryEntryOnCreation = (action$) => action$.ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.CREATE, ActionUtils.SUCCESS))
        .map(action => this._historyActions.create(HistoryEntryFactory.devisCreated(action.payload), action.payload.projectId));

    @Epic()
    createHistoryEntryOnRemoval = (action$) => action$.ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.DELETE, ActionUtils.SUCCESS))
        .map(action => this._historyActions.create(HistoryEntryFactory.devisDeleted(action.payload.model), action.payload.model.projectId));

}
