import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CurrentSession } from 'app/core/services/session.service';
import { GenericService } from 'app/core/generics/services/generic.service';
import { EventsService } from 'app/core/services/event.service';
import { ErrorService } from 'app/core/services/error.service';
import { User } from 'app/core/models/user.model';

@Injectable()
export class UserService extends GenericService<User> {
    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService) {
        super(http, errorService, currentSession, eventsService);
    }

    protected getModelName(): string {
        return 'users';
    }
}
