import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProfilActions } from './profil.actions';
import { RepositoriesService, User } from 'app/modules/core';
import { Project, Address } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions, IAppState } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';
import { SessionActions } from 'app/modules/auth';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';

@Injectable()
export class ProfilEpics {

    constructor(
        protected _userActions: ProfilActions,
        protected _repo: RepositoriesService
    ) { }

    @Epic()
    loadAddresses = action$ => action$
        .ofType(ProfilActions.LOAD_ADDRESSES_REQUEST)
        .switchMap((action) => {
            const request = this._repo.get(Address.name, null).byCurrentUser();
            return request.exec()
                .map(models => this._userActions.loadAddressesSuccess(models))
                .catch(error => of(this._userActions.loadAddressesError(error)))
        });

    @Epic()
    addAddress = action$ => action$
        .ofType(ProfilActions.USER_ADD_ADDRESS)
        .switchMap((action, state: IAppState) => {
            const request = this._repo.create<User>(Address.name, action.payload.address).byCurrentUser();
            return request.exec()
                .map(models => this._userActions.addAddressSuccess(state.session.userId, action.payload.address))
        });

    @Epic()
    removeAddress = action$ => action$
        .ofType(ProfilActions.USER_REMOVE_ADDRESS)
        .switchMap((action, state: IAppState) => {
            const request = this._repo.delete<User>(Address.name, action.payload.addressId).byCurrentUser();
            return request.exec()
                .map(models => this._userActions.removeAddressSuccess(state.session.userId, action.payload.addressId))
        });

}
