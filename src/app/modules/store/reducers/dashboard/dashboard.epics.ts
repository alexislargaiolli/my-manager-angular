import { Invoice } from './../../../../models/invoice.model';
import { Devis } from 'app/models';
import { ActionUtils } from './../model/action.utils';
import { ProjectDevisActions } from './../project-devis/project-devis.actions';
import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { RepositoriesService, User } from 'app/modules/core';
import { of } from 'rxjs/observable/of';
import { SessionActions } from 'app/modules/auth';
import { DashboardActions } from './dashboard.actions';
import { RequestMethod } from '@angular/http';
import { ModelActions } from 'app/modules/store/reducers/model/model.actions';
import * as moment from 'moment';
@Injectable()
export class DashboardEpics {

    constructor(private _dashboardActions: DashboardActions, private _repo: RepositoriesService) { }

    @Epic()
    onLogin = (action$, store) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => {
            let start = store.getState().profile.profile.startFiscalYear;
            if (start) {
                const today = moment();
                start = moment(start).year(today.year());
                if (today.isBefore(start)) {
                    start.subtract(1, 'years');
                }
                start = start.toDate();
            } else {
                start = moment().subtract(1, 'years').toDate();
            }
            const from = start;
            const to = moment(from).add(1, 'years').toDate();
            return this._dashboardActions.loadTotal(from, to);
        });

    @Epic()
    loadTotal = (action$) => action$.ofType(DashboardActions.LOAD_TOTAL_REQUEST)
        .switchMap((action) => {
            const request = this._repo.createCustomRequest<any>('totals', RequestMethod.Get).byCurrentUser();
            request.param('from', action.payload.from).param('to', action.payload.to);
            return request.exec()
                .map(data => this._dashboardActions.loadTotalSuccess(data, action.payload.from, action.payload.to))
                .catch(error => of(this._dashboardActions.loadTotalError(error)));
        })

    @Epic()
    updateAfterDevisUpdated = (action$, store) => action$.ofType(ActionUtils.asyncActionType(Devis.REPO_KEY, ModelActions.UPDATE, ActionUtils.SUCCESS))
        .map((action) => this._dashboardActions.loadTotal(store.getState().dashboard.from, store.getState().dashboard.to));

    @Epic()
    updateAfterDevisDeleted = (action$, store) => action$.ofType(ActionUtils.asyncActionType(Devis.REPO_KEY, ModelActions.DELETE, ActionUtils.SUCCESS))
        .map((action) => this._dashboardActions.loadTotal(store.getState().dashboard.from, store.getState().dashboard.to));

    @Epic()
    updateAfterInvoiceUpdated = (action$, store) => action$.ofType(ActionUtils.asyncActionType(Invoice.REPO_KEY, ModelActions.UPDATE, ActionUtils.SUCCESS))
        .map((action) => this._dashboardActions.loadTotal(store.getState().dashboard.from, store.getState().dashboard.to));

    @Epic()
    updateAfterInvoiceDeleted = (action$, store) => action$.ofType(ActionUtils.asyncActionType(Invoice.REPO_KEY, ModelActions.DELETE, ActionUtils.SUCCESS))
        .map((action) => this._dashboardActions.loadTotal(store.getState().dashboard.from, store.getState().dashboard.to));
}
