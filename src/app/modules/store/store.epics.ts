import { ProjectEpics } from './reducers/project/project.epics';
import { Injectable } from '@angular/core';
import { SessionEpics } from "app/modules/auth";
import { createEpics } from 'redux-observable-decorator';

@Injectable()
export class RootEpics {
    constructor(
        private _projectEpics: ProjectEpics,
        private _sessionEpics: SessionEpics
    ) { }

    public createEpics() {
        return createEpics(this._projectEpics, this._sessionEpics);
    }
}
