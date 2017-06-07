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
}
