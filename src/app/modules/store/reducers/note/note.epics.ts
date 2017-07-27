import { ProjectNoteActions } from 'app/modules/store';
import { SessionActions } from './../../../auth/redux/session/session.actions';
import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { NoteActions } from './note.actions';
import { RepositoriesService } from 'app/modules/core';
import { Note, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { ModelEpics } from '../model/model.epics';
import { ActionUtils } from '../model/action.utils';
import { ModelActions } from '../model/model.actions';

@Injectable()
export class NoteEpics extends ModelEpics<Note>{

    constructor(
        private _noteActions: NoteActions,
        protected _repo: RepositoriesService
    ) {
        super(Note.REPO_KEY, _repo, _noteActions);
    }

    /**
     * Define the action source to use in event name. Default is model name.
     */
    protected getActionSource(): string {
        return NoteActions.NOTE_SOURCE;
    }

    @Epic()
    load = action$ => action$
        .ofType(ActionUtils.asyncActionType(this.getActionSource(), ModelActions.LOAD, ActionUtils.REQUEST))
        .switchMap((action) => {
            const request = this._repo.get(this._modelName, null).byCurrentUser().orderBy('priority', true);
            return request.exec()
                .map(models => this._modelAction.loadSuccess(models))
                .catch(error => of(this._modelAction.loadError(error)));
        });

    @Epic()
    create = this.create;

    @Epic()
    update = this.update;

    @Epic()
    delete = this.delete;

    @Epic()
    onLogin = (action$) => action$.ofType(SessionActions.LOGIN_SUCCESS)
        .map(action => this._noteActions.load());
}
