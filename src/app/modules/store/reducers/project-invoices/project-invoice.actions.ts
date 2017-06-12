import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Invoice } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProjectInvoiceActions extends ModelActions<Invoice> {

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Invoice.REPO_KEY)
    }

    public static totalWaiting(state: IAppState) {
        return state.projectInvoices.items.reduce((prevVal, current) => {
            return prevVal + (current.state === 1 ? current.totalPrice : 0);
        }, 0);
    }

    public static totalAccepted(state: IAppState) {
        return state.projectInvoices.items.reduce((prevVal, current) => {
            return prevVal + (current.state === 2 ? current.totalPrice : 0);
        }, 0);
    }
}
