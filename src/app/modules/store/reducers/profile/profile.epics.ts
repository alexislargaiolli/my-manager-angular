import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProfileActions } from './profile.actions';
import { RepositoriesService, User } from 'app/modules/core';
import { Project, Profile } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { IAppState } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';
import { SessionActions } from 'app/modules/auth';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';

@Injectable()
export class ProfileEpics {

    constructor(
        protected _profileActions: ProfileActions,
        protected _repo: RepositoriesService
    ) { }

    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_RETRIVE_USER_INFO)
        .delay(100)
        .map(action => this._profileActions.load());

    @Epic()
    load = action$ => action$
        .ofType(ProfileActions.LOAD_PROFILE_REQUEST)
        .switchMap((action) => {
            const request = this._repo.get<Profile>(Profile.REPO_KEY, null).byCurrentUser();
            return request.exec()
                .map(models => this._profileActions.loadSuccess(models))
                .catch(error => of(this._profileActions.loadError(error)));
        })

    @Epic()
    update = action$ => action$
        .ofType(ProfileActions.UPDATE_PROFILE_REQUEST)
        .switchMap((action, state: IAppState) => {
            const request = this._repo.update<Profile>(Profile.REPO_KEY, action.payload, true).byCurrentUser();
            return request.exec()
                .map(models => this._profileActions.updateSuccess(action.payload));
        })

}
