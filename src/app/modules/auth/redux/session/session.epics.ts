import { Injectable } from '@angular/core';
import { SessionActions } from './session.actions';
import { RepositoriesService, User } from 'app/modules/core';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { animate } from '@angular/animations';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';
import { Epic } from 'redux-observable-decorator';

@Injectable()
export class SessionEpics {

    constructor(
        protected _repo: RepositoriesService,
        protected _sessionAction: SessionActions,
        protected _auth: AuthenticationService,
        protected _router: Router,
        protected _ngRedux: NgRedux<IAppState>
    ) { }

    @Epic()
    login = action$ => action$
        .ofType(SessionActions.LOGIN_REQUEST)
        .switchMap((action) =>
            this._auth.login(action.payload.username, action.payload.password)
                .map(data => this._sessionAction.loginSuccess(data.id, data.userId))
                .catch(error => of(this._sessionAction.loginError(error)))
        );

    @Epic()
    loginSuccess = action$ => action$
        .ofType(SessionActions.LOGIN_SUCCESS)
        .switchMap((action) => of(this._sessionAction.getUserInfo(action.payload.userId)));

    @Epic()
    storeAfterLogin = action$ => action$
        .ofType(SessionActions.LOGIN_SUCCESS)
        .switchMap((action) => of(this._sessionAction.storeInLocalStorage()));

    @Epic()
    logout = action$ => action$
        .ofType(SessionActions.LOGOUT_REQUEST)
        .switchMap((action) =>
            this._auth.logout()
                .map(data => this._sessionAction.logoutSuccess())
                .catch(error => of(this._sessionAction.logoutError(error)))
        );

    @Epic()
    logoutSuccess = action$ => action$.ofType(SessionActions.LOGOUT_SUCCESS)
        .switchMap((action) => of(this._sessionAction.removeFromLocalStorage()));

    @Epic()
    getUserInfo = action$ => action$
        .ofType(SessionActions.USER_INFO_REQUEST)
        .switchMap((action) =>
            this._repo.get<User>(User.name, action.payload).exec()
                .map(user => this._sessionAction.getUserInfoSuccess(user))
                .catch(error => of(this._sessionAction.getUserInfoError(error)))
        );

    @Epic()
    storeInLocalStorage = action$ => action$
        .ofType(SessionActions.STORE_IN_LOCAL_STORAGE)
        .switchMap((action) => {
            const session = this._ngRedux.getState().session;
            localStorage.setItem('currentSession', JSON.stringify({ userId: session.userId, token: session.token }));
            return of(this._sessionAction.storeInLocalStorageSuccess());
        });

    @Epic()
    readFromLocalStorage = action$ => action$
        .ofType(SessionActions.READ_FROM_LOCAL_STORAGE)
        .switchMap((action) => {
            const session = localStorage.getItem('currentSession');
            if (session) {
                const sessionObj = JSON.parse(session);
                if (sessionObj && sessionObj.userId && sessionObj.token) {
                    return of(this._sessionAction.loginSuccess(sessionObj.token, sessionObj.userId));
                }
            }
            return of(this._sessionAction.readFromLocalStorageError());
        });

    @Epic()
    removeFromLocalStorage = action$ => action$.ofType(SessionActions.REMOVE_FROM_LOCAL_STORAGE)
        .switchMap(() => {
            localStorage.removeItem('currentSession');
            return of(this._sessionAction.removeFromLocalStorageSucess())
        })

}
