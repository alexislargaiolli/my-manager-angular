import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { NoteActions } from './note.actions';
import { RepositoriesService } from 'app/modules/core';
import { Note, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';
import { SessionActions } from 'app/modules/auth';

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
    load = this.load;

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
