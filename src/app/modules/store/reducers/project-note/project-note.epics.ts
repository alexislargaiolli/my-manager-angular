import { NgRedux } from '@angular-redux/store';
import { ModelActions } from 'app/modules/store/reducers/model/model.actions';
import { ActionUtils } from './../model/action.utils';
import { ProjectActions } from './../project/project.actions';
import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable-decorator';
import { ProjectNoteActions } from './project-note.actions';
import { RepositoriesService } from 'app/modules/core';
import { Note, Project } from 'app/models';
import { by } from 'protractor';
import { of } from 'rxjs/observable/of';
import { ModelEpics } from '../model/model.epics';
import { IAppState } from 'app/modules/store';

@Injectable()
export class ProjectNoteEpics extends ModelEpics<Note>{

    @Epic()
    load = this.load;

    @Epic()
    create = this.create;

    @Epic()
    update = this.update;

    @Epic()
    delete = this.delete;

    constructor(
        private _noteActions: ProjectNoteActions,
        private _projectActions: ProjectActions,
        protected _redux: NgRedux<IAppState>,
        protected _repo: RepositoriesService
    ) {
        super(Note.REPO_KEY, _repo, _noteActions);
    }

    @Epic()
    projectSelect = (action$) => action$.ofType(ProjectActions.SELECT_PROJECT)
        .map(action => this._noteActions.load(action.payload.projectId));

    @Epic()
    onUpdate = (action$) => action$.ofType(ActionUtils.asyncActionType(Note.REPO_KEY, ModelActions.UPDATE, ActionUtils.SUCCESS))
        .map((action, state) => this._projectActions.updateNotes(action.payload.projectId, this._redux.getState().projectNotes.items));

    @Epic()
    onDelete = (action$) => action$.ofType(ActionUtils.asyncActionType(Note.REPO_KEY, ModelActions.DELETE, ActionUtils.SUCCESS))
        .map((action, state) => this._projectActions.updateNotes(action.payload.model.projectId, this._redux.getState().projectNotes.items));

    @Epic()
    onCreate = (action$) => action$.ofType(ActionUtils.asyncActionType(Note.REPO_KEY, ModelActions.CREATE, ActionUtils.SUCCESS))
        .map((action, state) => this._projectActions.updateNotes(action.payload.projectId, this._redux.getState().projectNotes.items));
}
