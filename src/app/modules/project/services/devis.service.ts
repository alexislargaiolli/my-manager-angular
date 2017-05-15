import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { ErrorService, EventsService, CurrentSession } from 'app/modules/core';
import { Devis } from 'app/models';

@Injectable()
export class DevisService extends GenericProjectModelService<Devis> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService
    ) {
        super(http, errorService, currentSession, eventsService);
    }

    protected getModelName(): string {
        return 'devis';
    }
}
