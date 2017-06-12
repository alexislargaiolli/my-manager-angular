import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Devis } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProjectDevisActions extends ModelActions<Devis> {

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Devis.REPO_KEY)
    }

    public static totalWaiting(state: IAppState) {
        return state.projectDevis.items.reduce((prevVal, current) => {
            return prevVal + (current.state === 1 ? current.totalPrice : 0);
        }, 0);
    }

    public static totalAccepted(state: IAppState) {
        return state.projectDevis.items.reduce((prevVal, current) => {
            return prevVal + (current.state === 2 ? current.totalPrice : 0);
        }, 0);
    }
}
