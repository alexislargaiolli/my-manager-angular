import { AuthenticationService } from './authentication.service';
import { ErrorService } from 'app/services/error.service';
import { HistoryEntry } from './../model/historyentry.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { EventsService } from 'app/services/event.service';

@Injectable()
export class HistoryEntryService extends GenericProjectModelService<HistoryEntry> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected authenticationService: AuthenticationService,
        protected eventsService: EventsService
    ) {
        super(http, errorService, authenticationService, eventsService);
    }

    protected getModelName(): string {
        return 'historyEntries';
    }

}
