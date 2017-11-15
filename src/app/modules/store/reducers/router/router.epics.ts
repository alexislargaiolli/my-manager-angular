import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { UPDATE_LOCATION } from '@angular-redux/router';
import { Router, NavigationStart } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs/Observable';
import { RouterActions } from 'app/modules/store/reducers/router/router.actions';

@Injectable()
export class RouterEpics {

    constructor(private _router: Router, private _routerActions: RouterActions) {

    }

    @Epic()
    updateLocation = (action$) => action$.ofType(UPDATE_LOCATION)
        .map(action => {
            this._router.navigateByUrl(action.payload);
            return this._routerActions.navigationStarts(action.payload);
        })
}
