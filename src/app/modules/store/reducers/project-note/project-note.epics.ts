import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectNoteActions } from './project-note.actions';
import { RepositoriesService } from 'app/modules/core';
import { Note, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { SelectedProjectActions } from 'app/modules/store';
import { ModelEpics } from '../model/model.epics';

@Injectable()
export class ProjectNoteEpics extends ModelEpics<Note>{

    constructor(
        private _noteActions: ProjectNoteActions,
        protected _repo: RepositoriesService
    ) {
        super(Note.name, _repo, _noteActions);
    }

    @Epic()
    loadNote = this.load;

    @Epic()
    createNote = this.create;

    @Epic()
    projectSelect = (action$) => action$.ofType(SelectedProjectActions.SELECT_PROJECT)
        .map(action => this._noteActions.load(action.payload.id));
}
