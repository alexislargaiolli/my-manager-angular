import { AuthenticationService } from './authentication.service';
import { ErrorService } from 'app/services/error.service';
import { Client } from './../model/client.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { EventsService } from 'app/services/event.service';
import { GenericProjectModelService } from 'app/services/generic.project-model-service';

@Injectable()
export class ClientService extends GenericProjectModelService<Client> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected authenticationService: AuthenticationService,
        protected eventsService: EventsService
    ) {
        super(http, errorService, authenticationService, eventsService);
    }

    protected getModelName(): string {
        return 'clients';
    }

}
