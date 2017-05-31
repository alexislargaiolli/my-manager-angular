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
        super(Note.REPO_KEY, _repo, _noteActions);
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
        .map(action => this._noteActions.load(action.payload.id));
}
