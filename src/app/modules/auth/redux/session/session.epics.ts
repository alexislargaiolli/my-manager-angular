import { Injectable } from '@angular/core';
import { SessionActions } from './session.actions';
import { RepositoriesService, User } from 'app/modules/core';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { animate } from '@angular/animations';
import { of } from 'rxjs/observable/of';
import { Router, NavigationStart } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState, ProfileActions } from 'app/modules/store';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/authentication.service';
import { Epic } from 'redux-observable-decorator';
import { UPDATE_LOCATION } from '@angular-redux/router/lib/es5';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

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
                .map(data => this._sessionAction.loginTokenReceived(data.id, data.userId))
                .catch(error => of(this._sessionAction.loginError(error)))
        );


    // @Epic()
    // redirectAfterLogin = action$ => action$.ofType(SessionActions.LOGIN_SUCCESS)
    //     .map((action) => {
    //         return { type: UPDATE_LOCATION, payload: `login` } });

    @Epic()
    tokenReceived = (action$, store) => action$
        .ofType(SessionActions.LOGIN_TOKEN_RECEIVED)
        .map((action) => this._sessionAction.loginRetriveUserInfo());

    @Epic()
    userInfoRetrivedSuccess = (action$, store) => action$
        .ofType(ProfileActions.LOAD_PROFILE_SUCCESS)
        .filter(action => !store.getState().session.authenticated)
        .map((action) => this._sessionAction.loginSuccess());

    @Epic()
    userInfoRetrivedError = (action$, store) => action$
        .ofType(ProfileActions.LOAD_PROFILE_ERROR)
        .filter(action => !store.getState().session.authenticated)
        .map((action) => this._sessionAction.loginError("Echec de l'authentification"));

    @Epic()
    storeAfterLogin = action$ => action$
        .ofType(SessionActions.LOGIN_SUCCESS)
        .map((action) => this._sessionAction.storeInLocalStorage());

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
        .map((action) => this._sessionAction.removeFromLocalStorage());

    @Epic()
    redirectAfterLogout = action$ => action$.ofType(SessionActions.LOGOUT_SUCCESS)
        .map((action) => { return { type: UPDATE_LOCATION, payload: `login` }; });

    @Epic()
    storeInLocalStorage = action$ => action$
        .ofType(SessionActions.STORE_IN_LOCAL_STORAGE)
        .switchMap((action) => {
            const session = this._ngRedux.getState().session;
            localStorage.setItem('currentSession', JSON.stringify({ userId: session.userId, token: session.token }));
            return of(this._sessionAction.storeInLocalStorageSuccess());
        })

    @Epic()
    readFromLocalStorage = action$ => action$
        .ofType(SessionActions.READ_FROM_LOCAL_STORAGE)
        .switchMap((action) => {
            const session = localStorage.getItem('currentSession');
            if (session) {
                const sessionObj = JSON.parse(session);
                if (sessionObj && sessionObj.userId && sessionObj.token) {
                    return of(this._sessionAction.loginTokenReceived(sessionObj.token, sessionObj.userId));
                }
            }
            return of(this._sessionAction.readFromLocalStorageError());
        })

    @Epic()
    removeFromLocalStorage = action$ => action$.ofType(SessionActions.REMOVE_FROM_LOCAL_STORAGE)
        .switchMap(() => {
            localStorage.removeItem('currentSession');
            return of(this._sessionAction.removeFromLocalStorageSucess());
        })


    @Epic()
    register = action$ => action$
        .ofType(SessionActions.REGISTER_REQUEST)
        .switchMap((action) =>
            this._auth.register(action.payload)
                .map(data => this._sessionAction.registerSuccess())
                .catch(error => {
                    console.log(error);
                    return of(this._sessionAction.registerError(error))
                })
        );
}
