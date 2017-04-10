import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IModel } from '../model/abstract.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export abstract class GenericService<T extends IModel> {

    constructor(protected http: Http,
        protected notificationService: NotificationService,
        protected authenticationService: AuthenticationService
    ) { }

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

    public update(id: number, attributes: Object): Observable<T> {
        return this.http.patch(`${this.getApiURL()}/${id}`, attributes, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    public delete(eltToDelete: T) {
        return this.http.delete(`${this.getApiURL()}/${eltToDelete.id}`, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    protected abstract getApiURL(): string;

    protected generateOptions(): RequestOptions {
        return new RequestOptions({ headers: this.generateHeaders() });
    }

    protected generateHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'x-access-token': this.authenticationService.token
        });
    }

    protected handleError(error: any) {
        let msg = null;
        if (error.status && error.status == 403) {
            msg = 'Accès interdit.';
        }
        try {
            msg = error.json().err || 'Server error';            
        }
        catch (e) {
            if (msg == null) {
                msg = 'Erreur inconnue';
            }
        }
        console.error(error);
        this.notificationService.addError(msg);
        return Observable.throw(msg);
    }

    protected BASE_URL = "http://localhost:1337";

}
