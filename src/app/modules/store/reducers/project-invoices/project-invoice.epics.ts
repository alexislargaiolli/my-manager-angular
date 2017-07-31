import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectInvoiceActions } from './project-invoice.actions';
import { RepositoriesService, RepositoryRequest } from 'app/modules/core';
import { Invoice, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { IAppState, ProjectHistoryEntryActions, ProjectActions } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';
import { HistoryEntryFactory } from 'app/models/historyentry.factory';

@Injectable()
export class ProjectInvoiceEpics extends ModelEpics<Invoice> {

    constructor(
        protected _invoiceActions: ProjectInvoiceActions,
        private _historyActions: ProjectHistoryEntryActions,
        protected _repo: RepositoriesService
    ) {
        super(Invoice.REPO_KEY, _repo, _invoiceActions);
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
        .map(action => this._invoiceActions.load(action.payload.projectId));

    @Epic()
    createHistoryEntryOnCreation = (action$) => action$.ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.CREATE, ActionUtils.SUCCESS))
        .map(action => this._historyActions.create(HistoryEntryFactory.invoiceCreated(action.payload), action.payload.projectId));

    @Epic()
    createHistoryEntryOnRemoval = (action$) => action$.ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.DELETE, ActionUtils.SUCCESS))
        .map(action => this._historyActions.create(HistoryEntryFactory.invoiceDeleted(action.payload.model), action.payload.model.projectId));

    protected createRequest(request: RepositoryRequest<Invoice>) {
        request.addUserIdToBody();
    }
}
