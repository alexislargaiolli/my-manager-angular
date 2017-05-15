import { HistoryEntry } from 'app/models';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { ErrorService, EventsService, CurrentSession } from 'app/modules/core';

@Injectable()
export class HistoryEntryService extends GenericProjectModelService<HistoryEntry> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService
    ) {
        super(http, errorService, currentSession, eventsService);
    }

    protected getModelName(): string {
        return 'historyEntries';
    }

}
