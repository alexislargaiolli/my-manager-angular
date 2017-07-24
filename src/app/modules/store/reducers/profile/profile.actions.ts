import { Injectable } from '@angular/core';
import { RepositoriesService, User } from 'app/modules/core';
import { Address, Profile } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProfileActions {

    public static readonly LOAD_PROFILE_REQUEST = 'LOAD_PROFILE_REQUEST';
    public static readonly LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
    public static readonly LOAD_PROFILE_ERROR = 'LOAD_PROFILE_ERROR';
    public static readonly UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
    public static readonly UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
    public static readonly UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';
    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) { }

    public dispatchLoad() {
        this._ngRedux.dispatch(this.load());
    }

    load() {
        return {
            type: ProfileActions.LOAD_PROFILE_REQUEST,
        };
    }

    loadSuccess(addresses: Address[]) {
        return {
            type: ProfileActions.LOAD_PROFILE_SUCCESS,
            payload: addresses
        };
    }

    loadError(error) {
        return {
            type: ProfileActions.LOAD_PROFILE_ERROR,
            payload: error
        };
    }

    public dispatchUpdate(profile: Profile) {
        this._ngRedux.dispatch(this.update(profile));
    }

    update(profile: Profile) {
        return {
            type: ProfileActions.UPDATE_PROFILE_REQUEST,
            payload: profile
        };
    }

    updateSuccess(profile: Profile) {
        return {
            type: ProfileActions.UPDATE_PROFILE_SUCCESS,
            payload: profile
        };
    }

    updateError(error) {
        return {
            type: ProfileActions.UPDATE_PROFILE_ERROR,
            payload: error
        };
    }

}
