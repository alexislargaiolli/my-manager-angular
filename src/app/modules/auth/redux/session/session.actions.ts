import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store.types';
import { User } from 'app/modules/core';
import { Router } from '@angular/router';
@Injectable()
export class SessionActions {
    public static readonly LOGIN_REQUEST = 'LOGIN_REQUEST';
    public static readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    public static readonly LOGIN_ERROR = 'LOGIN_ERROR';

    public static readonly REGISTER_REQUEST = 'REGISTER_REQUEST';
    public static readonly REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    public static readonly REGISTER_ERROR = 'REGISTER_ERROR';

    public static readonly LOGOUT_REQUEST = 'LOGOUT_REQUEST';
    public static readonly LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    public static readonly LOGOUT_ERROR = 'LOGOUT_ERROR';

    public static readonly STORE_IN_LOCAL_STORAGE = 'STORE_IN_LOCAL_STORAGE';
    public static readonly STORE_IN_LOCAL_STORAGE_SUCCESS = 'STORE_IN_LOCAL_STORAGE_SUCCESS';

    public static readonly READ_FROM_LOCAL_STORAGE = 'READ_FROM_LOCAL_STORAGE';
    public static readonly READ_FROM_LOCAL_STORAGE_SUCCESS = 'READ_FROM_LOCAL_STORAGE_SUCCESS';
    public static readonly READ_FROM_LOCAL_STORAGE_ERROR = 'READ_FROM_LOCAL_STORAGE_ERROR';

    public static readonly REMOVE_FROM_LOCAL_STORAGE = 'REMOVE_FROM_LOCAL_STORAGE';
    public static readonly REMOVE_FROM_LOCAL_STORAGE_SUCCESS = 'REMOVE_FROM_LOCAL_STORAGE_SUCCESS';

    constructor(private _ngRedux: NgRedux<IAppState>, private _router: Router) { }

    login(credentials) {
        return {
            type: SessionActions.LOGIN_REQUEST,
            payload: credentials
        }
    }

    loginSuccess(token: string, userId: number) {
        return {
            type: SessionActions.LOGIN_SUCCESS,
            payload: {
                token,
                userId
            }
        }
    }

    loginError(error) {
        return {
            type: SessionActions.LOGIN_ERROR,
            payload: error
        }
    }

    dispatchLogin(credentials) {
        this._ngRedux.dispatch(this.login(credentials));
    }

    logout() {
        return {
            type: SessionActions.LOGOUT_REQUEST
        }
    }

    logoutSuccess() {
        this._router.navigate(['/login']);
        return {
            type: SessionActions.LOGOUT_SUCCESS
        }
    }

    logoutError(error) {
        return {
            type: SessionActions.LOGOUT_ERROR,
            payload: error
        }
    }

    dispatchLogout() {
        this._ngRedux.dispatch(this.logout());
    }

    storeInLocalStorage() {
        return {
            type: SessionActions.STORE_IN_LOCAL_STORAGE
        }
    }

    storeInLocalStorageSuccess() {
        return {
            type: SessionActions.STORE_IN_LOCAL_STORAGE_SUCCESS
        }
    }

    readFromLocalStorage() {
        return {
            type: SessionActions.READ_FROM_LOCAL_STORAGE
        }
    }

    dispatchReadFromLocalStorage() {
        this._ngRedux.dispatch(this.readFromLocalStorage());
    }

    readFromLocalStorageSuccess(sessionRead) {
        return {
            type: SessionActions.READ_FROM_LOCAL_STORAGE_SUCCESS,
            payload: sessionRead
        }
    }

    readFromLocalStorageError() {
        return {
            type: SessionActions.READ_FROM_LOCAL_STORAGE_ERROR
        }
    }

    removeFromLocalStorage() {
        return {
            type: SessionActions.REMOVE_FROM_LOCAL_STORAGE
        }
    }

    removeFromLocalStorageSucess() {
        return {
            type: SessionActions.REMOVE_FROM_LOCAL_STORAGE_SUCCESS
        }
    }

    register(data) {
        return {
            type: SessionActions.REGISTER_REQUEST,
            payload: data
        }
    }

    registerSuccess() {
        return {
            type: SessionActions.REGISTER_SUCCESS
        }
    }

    registerError(error: string) {
        return {
            type: SessionActions.REGISTER_ERROR,
            payload: error
        }
    }

    public dispatchRegister(data) {
        this._ngRedux.dispatch(this.register(data));
    }
}
