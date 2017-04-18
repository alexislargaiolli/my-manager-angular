import { AuthenticationService, Session } from './authentication.service';
import { ErrorService } from 'app/services/error.service';
import { Observable } from 'rxjs/Observable';
import { Client } from './../model/client.model';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { GenericService } from './generic.service';
import { Project } from '../model/project.model';
import { EventsService, AppEvent } from 'app/services/event.service';

@Injectable()
export class ProjectService extends GenericService<Project> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected authenticationService: AuthenticationService,
        protected eventsService: EventsService
    ) {
        super(http, errorService, authenticationService, eventsService);
    }

    protected getModelName(): string {
        return 'projects';
    }
}
