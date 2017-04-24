import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppSettings } from 'app/app-settings';
import { CurrentSession } from 'app/core/services/session.service';
import { IModel } from 'app/core/generics/models/generic.model';
import { EventsService } from 'app/core/services/event.service';
import { ErrorService } from 'app/core/services/error.service';
import { BasicService } from 'app/core/generics/services/base.service';

export abstract class GenericService<T extends IModel> extends BasicService<T> {

    protected BASE_URL = AppSettings.API_ENDPOINT;
    protected GET_ALL_BASE_URL: string;
    protected GET_BASE_URL: string;
    protected CREATE_BASE_URL: string;
    protected UPDATE_BASE_URL: string;
    protected DELETE_BASE_URL: string;
    protected HEADERS_OPTIONS: RequestOptions;

    constructor(protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService
    ) {
        super(http, errorService, eventsService);
    }

    protected getApiURL(): string {
        return `${this.BASE_URL}/mmusers/${this.currentSession.userId}/${this.getModelName()}`;
    }

    protected generateHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.currentSession.token
        });
    }
}
