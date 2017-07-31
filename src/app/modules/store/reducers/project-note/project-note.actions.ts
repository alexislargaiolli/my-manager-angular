import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Note } from 'app/models';
import { IAppState } from 'app/modules/store';
import { NgRedux } from '@angular-redux/store';
import { ModelActions } from '../model/model.actions';

@Injectable()
export class ProjectNoteActions extends ModelActions<Note> {

    constructor(protected _repo: RepositoriesService, protected _ngRedux: NgRedux<IAppState>) {
        super(_ngRedux, _repo, Note.REPO_KEY);
    }
}
