import { Observable } from 'rxjs/Observable';
import { Gain } from 'app/models';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { ErrorService, EventsService, CurrentSession } from 'app/modules/core';

@Injectable()
export class GainService extends GenericProjectModelService<Gain> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService
    ) {
        super(http, errorService, currentSession, eventsService);
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
