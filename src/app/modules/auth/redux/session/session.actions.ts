import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store.types';
import { User } from 'app/modules/core';
import { Router } from '@angular/router';
@Injectable()
export class SessionActions {

    constructor(private _ngRedux: NgRedux<IAppState>, private _router: Router) { }

    public static readonly LOGIN_REQUEST = 'LOGIN_REQUEST';
    login(credentials) {
        return {
            type: SessionActions.LOGIN_REQUEST,
            payload: credentials
        }
    }

    dispatchLogin(credentials) {
        this._ngRedux.dispatch(this.login(credentials));
    }

    public static readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    loginSuccess(token: string, userId: number) {
        return {
            type: SessionActions.LOGIN_SUCCESS,
            payload: {
                token,
                userId
            }
        }
    }

    public static readonly LOGIN_ERROR = 'LOGIN_ERROR';
    loginError(error) {
        return {
            type: SessionActions.LOGIN_ERROR,
            payload: error
        }
    }

    public static readonly LOGOUT_REQUEST = 'LOGOUT_REQUEST';
    logout() {
        return {
            type: SessionActions.LOGOUT_REQUEST
        }
    }

    public static readonly LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    logoutSuccess() {
        this._router.navigate(['/login']);
        return {
            type: SessionActions.LOGOUT_SUCCESS
        }
    }

    public static readonly LOGOUT_ERROR = 'LOGOUT_ERROR';
    logoutError(error) {
        return {
            type: SessionActions.LOGOUT_ERROR,
            payload: error
        }
    }

    dispatchLogout() {
        this._ngRedux.dispatch(this.logout());
    }

    public static readonly USER_INFO_REQUEST = 'USER_INFO_REQUEST';
    getUserInfo(userId) {
        return {
            type: SessionActions.USER_INFO_REQUEST,
            payload: userId
        }
    }

    public static readonly USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
    getUserInfoSuccess(user: User) {
        return {
            type: SessionActions.USER_INFO_SUCCESS,
            payload: user
        }
    }

    public static readonly USER_INFO_ERROR = 'USER_INFO_ERROR';
    getUserInfoError(error) {
        return {
            type: SessionActions.USER_INFO_ERROR,
            payload: error
        }
    }

    public static readonly STORE_IN_LOCAL_STORAGE = 'STORE_IN_LOCAL_STORAGE';
    storeInLocalStorage() {
        return {
            type: SessionActions.STORE_IN_LOCAL_STORAGE
        }
    }

    public static readonly STORE_IN_LOCAL_STORAGE_SUCCESS = 'STORE_IN_LOCAL_STORAGE_SUCCESS';
    storeInLocalStorageSuccess() {
        return {
            type: SessionActions.STORE_IN_LOCAL_STORAGE_SUCCESS
        }
    }

    public static readonly READ_FROM_LOCAL_STORAGE = 'READ_FROM_LOCAL_STORAGE';
    readFromLocalStorage() {
        return {
            type: SessionActions.READ_FROM_LOCAL_STORAGE
        }
    }

    dispatchReadFromLocalStorage() {
        this._ngRedux.dispatch(this.readFromLocalStorage());
    }

    public static readonly READ_FROM_LOCAL_STORAGE_SUCCESS = 'READ_FROM_LOCAL_STORAGE_SUCCESS';
    readFromLocalStorageSuccess(sessionRead) {
        return {
            type: SessionActions.READ_FROM_LOCAL_STORAGE_SUCCESS,
            payload: sessionRead
        }
    }

    public static readonly READ_FROM_LOCAL_STORAGE_ERROR = 'READ_FROM_LOCAL_STORAGE_ERROR';
    readFromLocalStorageError() {
        return {
            type: SessionActions.READ_FROM_LOCAL_STORAGE_ERROR
        }
    }

    public static readonly REMOVE_FROM_LOCAL_STORAGE = 'REMOVE_FROM_LOCAL_STORAGE';
    removeFromLocalStorage() {
        return {
            type: SessionActions.REMOVE_FROM_LOCAL_STORAGE
        }
    }

    public static readonly REMOVE_FROM_LOCAL_STORAGE_SUCCESS = 'REMOVE_FROM_LOCAL_STORAGE_SUCCESS';
    removeFromLocalStorageSucess() {
        return {
            type: SessionActions.REMOVE_FROM_LOCAL_STORAGE_SUCCESS
        }
    }
}
