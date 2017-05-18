import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Project } from 'app/models';
import { of } from 'rxjs/observable/of';
import { createEpicMiddleware } from 'redux-observable';
import { ModelEpics } from '../model/model.epics';
import { Epic } from 'redux-observable-decorator';
import { UPDATE_LOCATION } from "@angular-redux/router/lib/es5";
import { Observable } from 'rxjs/Observable';
import { SelectedProjectActions } from 'app/modules/store';

@Injectable()
export class SelectedProjectEpics {

    constructor(
        protected _repo: RepositoriesService,
        protected _selectedProjectActions: SelectedProjectActions,
    ) { }

    /**
     * Redirect to project dashboard after project selection
     */
    @Epic()
    selectProject = action$ => action$.ofType(SelectedProjectActions.SELECT_PROJECT)
        .map(action => { return { type: UPDATE_LOCATION, payload: `project/${action.payload.id}/dashboard` } });

}
