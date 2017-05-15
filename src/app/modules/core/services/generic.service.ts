import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppSettings } from 'app/app-settings';
import { IModel } from '../models/generic.model';
import { CurrentSession } from './session.service';
import { EventsService } from './event.service';
import { ErrorService } from './error.service';
import { BasicService } from './base.service';

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
