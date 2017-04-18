import { AuthenticationService } from './authentication.service';
import { ErrorService } from 'app/services/error.service';
import { Observable } from 'rxjs/Observable';
import { Gain } from '../model/gain.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { EventsService } from 'app/services/event.service';

@Injectable()
export class GainService extends GenericProjectModelService<Gain> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected authenticationService: AuthenticationService,
        protected eventsService: EventsService
    ) {
        super(http, errorService, authenticationService, eventsService);
    }

    public getTotals(): Observable<any> {
        return this.http.get(`${this.getApiURL()}/total`, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    protected getModelName(): string {
        return 'gains';
    }
}
