import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectInvoiceActions } from './project-invoice.actions';
import { RepositoriesService } from 'app/modules/core';
import { Invoice, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions, IAppState } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProjectInvoiceEpics extends ModelEpics<Invoice> {

    constructor(
        protected _invoiceActions: ProjectInvoiceActions,
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
    projectSelect = (action$) => action$.ofType(SelectedProjectActions.SELECT_PROJECT)
        .map(action => this._invoiceActions.load(action.payload.id));
}
