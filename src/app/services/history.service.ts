import { HistoryEntry } from './../model/historyentry.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { ErrorService } from 'app/core/services/error.service';
import { EventsService } from 'app/core/services/event.service';
import { CurrentSession } from 'app/core/services/session.service';

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
