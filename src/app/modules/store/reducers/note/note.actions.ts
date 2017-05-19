import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Note } from 'app/models';
import { IAppState } from 'app/modules/store';
import { NgRedux } from '@angular-redux/store';
import { ModelActions } from '../model/model.actions';

@Injectable()
export class NoteActions extends ModelActions<Note> {
    public static readonly NOTE_SOURCE = 'GENERAL_NOTE';

    constructor(protected _repo: RepositoriesService, protected _ngRedux: NgRedux<IAppState>) {
        super(_ngRedux, _repo, Note.name)
    }

    /**
     * Define the action source to use in event name. Default is model name.
     */
    protected getActionSource(): string {
        return NoteActions.NOTE_SOURCE;
    }
}
