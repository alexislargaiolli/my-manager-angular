import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { GenericService } from 'app/core/generics/services/generic.service';
import { User } from 'app/core/models/user.model';
import { ErrorService } from './error.service';
import { EventsService } from './event.service';
import { CurrentSession } from './session.service';
import { BasicService } from 'app/core/generics/services/base.service';
import { Observable } from 'rxjs/Observable';
import { UserSession } from 'app/core/models/user-session.model';

@Injectable()
export class UserService extends BasicService<User> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected eventsService: EventsService
    ) {
        super(http, errorService, eventsService);
    }

    protected getModelName(): string {
        return 'mmusers';
    }

    public me(userSession: UserSession): Observable<User> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': userSession.token
        });
        const options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.getApiURL()}/${userSession.userId}`, options)
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }
}
