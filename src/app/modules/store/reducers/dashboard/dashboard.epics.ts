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
import { ModelActions } from "app/modules/store/reducers/model/model.actions";

@Injectable()
export class DashboardEpics {

    constructor(private _dashboardActions: DashboardActions, private _repo: RepositoriesService) { }

    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => this._dashboardActions.loadTotal());

    @Epic()
    loadTotal = (action$) => action$.ofType(DashboardActions.LOAD_TOTAL_REQUEST)
        .switchMap((action) => {
            console.log('totyal');
            // return this._repo.get<Devis>(Devis.REPO_KEY, null).byCurrentUser().field('totalPrice').where('state', 0).exec().map(data => {
            //     data.reduce(total, )
            //     console.log(data);
            //     console.log('data');
            //     this._dashboardActions.loadTotalSuccess({

            //     });
            // }).catch(error => of(this._dashboardActions.loadTotalError(error)));
            const request = this._repo.createCustomRequest<any>('totals', RequestMethod.Get).byCurrentUser();
            return request.exec()
                .map(data => this._dashboardActions.loadTotalSuccess(data))
                .catch(error => of(this._dashboardActions.loadTotalError(error)));
        })

    @Epic()
    updateAfterDevisUpdated = (action$) => action$.ofType(ActionUtils.asyncActionType(Devis.REPO_KEY, ModelActions.UPDATE, ActionUtils.SUCCESS))
        .map((action) => this._dashboardActions.loadTotal());

    @Epic()
    updateAfterDevisDeleted = (action$) => action$.ofType(ActionUtils.asyncActionType(Devis.REPO_KEY, ModelActions.DELETE, ActionUtils.SUCCESS))
        .map((action) => this._dashboardActions.loadTotal());

    @Epic()
    updateAfterInvoiceUpdated = (action$) => action$.ofType(ActionUtils.asyncActionType(Invoice.REPO_KEY, ModelActions.UPDATE, ActionUtils.SUCCESS))
        .map((action) => this._dashboardActions.loadTotal());

    @Epic()
    updateAfterInvoiceDeleted = (action$) => action$.ofType(ActionUtils.asyncActionType(Invoice.REPO_KEY, ModelActions.DELETE, ActionUtils.SUCCESS))
        .map((action) => this._dashboardActions.loadTotal());
}
