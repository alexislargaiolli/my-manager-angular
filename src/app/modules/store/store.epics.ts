import { ProjectEpics } from './reducers/project/project.epics';
import { Injectable } from '@angular/core';
import { SessionEpics } from "app/modules/auth";
import { createEpics } from 'redux-observable-decorator';
import { ProjectTaskEpics } from './reducers/project-task/project-task.epics';
import { SelectedProjectEpics } from './reducers/selected-project/selected-project.epics';
import { ProjectDevisEpics } from './reducers/project-devis/project-devis.epics';
import { ProjectNoteEpics } from './reducers/project-note/project-note.epics';
import { ProjectHistoryEntryEpics } from './reducers/project-history/project-history.epics';
import { NoteEpics } from './reducers/note/note.epics';
import { ClientEpics } from './reducers/client/client.epics';
import { ProjectClientEpics } from './reducers/project-client/project-client.epics';
import { ProfileEpics } from './reducers/profile/profile.epics';

@Injectable()
export class RootEpics {
    constructor(
        private _projectEpics: ProjectEpics,
        private _noteEpics: NoteEpics,
        private _selectedProjectEpics: SelectedProjectEpics,
        private _sessionEpics: SessionEpics,
        private _taskEpics: ProjectTaskEpics,
        private _devisEpics: ProjectDevisEpics,
        private _noteProjectEpics: ProjectNoteEpics,
        private _historyEpics: ProjectHistoryEntryEpics,
        private _clientEpics: ClientEpics,
        private _projectClientEpics: ProjectClientEpics,
        private _profileEpics: ProfileEpics
    ) { }

    public createEpics() {
        return createEpics(
            this._projectEpics,
            this._noteEpics,
            this._sessionEpics,
            this._taskEpics,
            this._selectedProjectEpics,
            this._devisEpics,
            this._noteProjectEpics,
            this._historyEpics,
            this._clientEpics,
            this._projectClientEpics,
            this._profileEpics
        );
    }
}
