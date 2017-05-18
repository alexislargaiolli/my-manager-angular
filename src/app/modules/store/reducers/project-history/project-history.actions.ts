import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { HistoryEntry } from 'app/models';
import { IAppState } from 'app/modules/store';
import { NgRedux } from '@angular-redux/store';
import { ModelActions } from '../model/model.actions';

@Injectable()
export class ProjectHistoryEntryActions extends ModelActions<HistoryEntry> {

    constructor(protected _repo: RepositoriesService, protected _ngRedux: NgRedux<IAppState>) {
        super(_ngRedux, _repo, HistoryEntry.name)
    }
}
