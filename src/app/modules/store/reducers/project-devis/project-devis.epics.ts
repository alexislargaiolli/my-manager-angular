import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectDevisActions } from './project-devis.actions';
import { RepositoriesService } from 'app/modules/core';
import { Devis, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions, IAppState } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProjectDevisEpics extends ModelEpics<Devis> {

    constructor(
        protected _devisActions: ProjectDevisActions,
        protected _repo: RepositoriesService
    ) {
        super(Devis.REPO_KEY, _repo, _devisActions);
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
    projectSelect = (action$) => action$.ofType(SelectedProjectActions.SELECT_PROJECT)
        .map(action => this._devisActions.load(action.payload.id));
}
