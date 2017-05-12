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

export abstract class BasicService<T extends IModel> {

    protected BASE_URL = AppSettings.API_ENDPOINT;
    protected GET_ALL_BASE_URL: string;
    protected GET_BASE_URL: string;
    protected CREATE_BASE_URL: string;
    protected UPDATE_BASE_URL: string;
    protected DELETE_BASE_URL: string;
    protected HEADERS_OPTIONS: RequestOptions;
    protected debug: boolean;

    constructor(protected http: Http,
        protected errorService: ErrorService,
        protected eventsService: EventsService
    ) { }

    protected getBaseApiURL(): string {
        return `${this.BASE_URL}/${this.getModelName()}`;
    }

    protected getApiURL(): string {
        return `${this.BASE_URL}/${this.getModelName()}`;
    }

    public getAll(): Observable<T[]> {
        return this.handleResponse(this.http.get(this.getApiURL(), this.generateOptions()));
    }

    public get(id: number): Observable<T> {
        return this.handleResponse(this.http.get(`${this.getApiURL()}/${id}`, this.generateOptions()));
    }

    /**
     * Create an element if id is null, update it otherwise
     * @param body element to save
     */
    public save(body): Observable<T> {
        if (body['id']) {
            return this.update(body);
        }
        return this.create(body);
    }

    public create(body: Object): Observable<T> {
        this.traceBefore(body);
        return this.handleResponse(this.http.post(this.getApiURL(), body, this.generateOptions()));
    }

    public update(element: T): Observable<T> {
        this.traceBefore(element);
        return this.handleResponse(this.http.put(`${this.getApiURL()}/${element.id}`, element, this.generateOptions()));
    }

    public delete(eltToDelete: T) {
        return this.handleResponse(this.http.delete(`${this.getApiURL()}/${eltToDelete.id}`, this.generateOptions()));
    }

    protected abstract getModelName(): string;

    protected handleResponse(response: Observable<Response>) {
        return response.map((res: Response) => {
            const data = res.json();
            this.trace(data);
            return data;
        })
            .catch(err => this.handleError(err));
    }

    protected generateOptions(): RequestOptions {
        return new RequestOptions({ headers: this.generateHeaders() });
    }

    protected generateHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json'            
        });
    }

    protected handleError(error: Response) {
        return this.errorService.handleNetworkError(this.constructor.name, error.status, error.statusText, error.json());
    }

    public activeDebug() {
        this.debug = true;
    }

    public traceBefore(body: Object) {
        if (this.debug) {
            console.log('Before>');
            if (body instanceof Array) {
                console.table(body);
            } else {
                console.log(body);
            }
        }
    }

    protected trace(body: Object) {
        if (this.debug) {
            console.log('Result>');
            if (body instanceof Array) {
                console.table(body);
            } else {
                console.log(body);
            }
        }
    }
}
