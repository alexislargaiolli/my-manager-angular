import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ClientActions } from './client.actions';
import { RepositoriesService } from 'app/modules/core';
import { Client, Project, Address } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions, IAppState } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';
import { SessionActions } from 'app/modules/auth';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';

@Injectable()
export class ClientEpics extends ModelEpics<Client> {

    constructor(
        protected _clientActions: ClientActions,
        protected _repo: RepositoriesService
    ) {
        super(Client.REPO_KEY, _repo, _clientActions);
    }

    @Epic()
    load = this.load;

    @Epic()
    create = this.create;

    @Epic()
    update = this.update;

    @Epic()
    delete = this.delete;

    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => this._clientActions.load());

}
