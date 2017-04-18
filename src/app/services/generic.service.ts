import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IModel } from '../model/abstract.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorService } from 'app/services/error.service';
import { EventsService } from 'app/services/event.service';
import { AppSettings } from 'app/app-settings';

export abstract class GenericService<T extends IModel> {

    protected BASE_URL = AppSettings.API_ENDPOINT;
    protected GET_ALL_BASE_URL: string;
    protected GET_BASE_URL: string;
    protected CREATE_BASE_URL: string;
    protected UPDATE_BASE_URL: string;
    protected DELETE_BASE_URL: string;
    protected HEADERS_OPTIONS: RequestOptions;

    constructor(protected http: Http,
        protected errorService: ErrorService,
        protected authenticationService: AuthenticationService,
        protected eventsService: EventsService
    ) { }

    protected getApiURL(): string {
        return `${this.BASE_URL}/mmusers/${this.authenticationService.userId}/${this.getModelName()}`;
    }

    public getAll(): Observable<T[]> {
        return this.http.get(this.getApiURL(), this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    public get(id: number): Observable<T> {
        return this.http.get(`${this.getApiURL()}/${id}`, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    public create(body: Object): Observable<T> {
        return this.http.post(this.getApiURL(), body, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    public update(element: T): Observable<T> {
        return this.http.put(`${this.getApiURL()}/${element.id}`, element, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    public delete(eltToDelete: T) {
        return this.http.delete(`${this.getApiURL()}/${eltToDelete.id}`, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    protected abstract getModelName(): string;

    protected generateOptions(): RequestOptions {
        return new RequestOptions({ headers: this.generateHeaders() });
    }

    protected generateHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authenticationService.token
        });
    }

    protected handleError(error: Response) {
        return this.errorService.handleNetworkError(this.constructor.name, error.status, error.statusText, error.json());
    }
}
