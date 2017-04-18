import { AuthenticationService, Session } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { Client } from './../model/client.model';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Project } from '../model/project.model';
import { ErrorService } from 'app/core/services/error.service';
import { EventsService } from 'app/core/services/event.service';
import { CurrentSession } from 'app/core/services/session.service';
import { GenericService } from 'app/core/generics/services/generic.service';

@Injectable()
export class ProjectService extends GenericService<Project> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService
    ) {
        super(http, errorService, currentSession, eventsService);
    }

    protected getModelName(): string {
        return 'projects';
    }
}
