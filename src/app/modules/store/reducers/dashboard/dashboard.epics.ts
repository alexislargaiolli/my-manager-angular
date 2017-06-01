import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { RepositoriesService, User } from 'app/modules/core';
import { of } from 'rxjs/observable/of';
import { SessionActions } from 'app/modules/auth';
import { DashboardActions } from './dashboard.actions';
import { RequestMethod } from '@angular/http';

@Injectable()
export class DashboardEpics {

    constructor(private _dashboardActions: DashboardActions, private _repo: RepositoriesService) { }

    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => this._dashboardActions.loadTotal());

    @Epic()
    loadTotal = (action$) => action$.ofType(DashboardActions.LOAD_TOTAL_REQUEST)
        .switchMap((action) => {
            const request = this._repo.createCustomRequest<any>('totals', RequestMethod.Get).byCurrentUser();
            return request.exec()
                .map(data => this._dashboardActions.loadTotalSuccess(data))
                .catch(error => of(this._dashboardActions.loadTotalError(error)));
        })
}
