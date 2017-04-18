import { AuthenticationService } from './authentication.service';
import { ErrorService } from 'app/services/error.service';
import { GenericProjectModelService } from './generic.project-model-service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Note } from '../model/note.model';
import { EventsService } from 'app/services/event.service';

@Injectable()
export class NoteService extends GenericProjectModelService<Note> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected authenticationService: AuthenticationService,
        protected eventsService: EventsService
    ) {
        super(http, errorService, authenticationService, eventsService);
    }

    protected getModelName(): string {
        return 'notes';
    }

}
