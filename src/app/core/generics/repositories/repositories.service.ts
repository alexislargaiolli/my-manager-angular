import { Injectable } from '@angular/core';
import { RequestMethod, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IModel } from 'app/core/generics/models/generic.model';
import { AppSettings } from 'app/app-settings';
import { RepositoryRequest } from 'app/core/generics/repositories/repository-request';
import { ErrorService } from 'app/core/services/error.service';
import { BaseHttpService } from 'app/core/generics/repositories/base-http.service';
import { EventsService, AppEvent } from 'app/core/services/event.service';
import { UserSession } from 'app/core/models/user-session.model';

@Injectable()
export class RepositoriesService {
    private manageClasses: Map<string, string> = new Map();
    private authToken: string;

    constructor(protected http: Http, private baseHttpService: BaseHttpService, private eventsService: EventsService) {
        eventsService.on(AppEvent.AUTHENTICATION_SUCCESS, (session: UserSession) => {
            this.authToken = session.token;
        });
        eventsService.on(AppEvent.LOGGED_OUT, (session: UserSession) => {
            this.authToken = null;
        });
    }

    public addManageClass(className: string, apiUrl: string) {
        this.manageClasses.set(className, apiUrl);
    }

    public getApiUrl(className: string): string {
        return this.manageClasses.get(className);
    }

    public create<T extends IModel>(className: string, body: any): RepositoryRequest<T> {
        const request = this.createBaseRequest<T>(className, null, RequestMethod.Post);
        request.body = body;
        return request;
    }

    public update<T extends IModel>(className: string, elt: T): RepositoryRequest<T> {
        const request = this.createBaseRequest<T>(className, null, RequestMethod.Put);
        request.body = elt;
        return request;
    }

    /**
     * Get a list if id is null, one instance if id is defined
     */
    public get<T extends IModel>(className: string, id: number): RepositoryRequest<T> {
        return this.createBaseRequest<T>(className, id, RequestMethod.Get);
    }

    /**
     * Delete a model by id
     */
    public delete<T extends IModel>(className: string, id: number): RepositoryRequest<T> {
        return this.createBaseRequest<T>(className, id, RequestMethod.Delete);
    }

    /**
     * Create a base request. id can be null
     */
    private createBaseRequest<T extends IModel>(className: string, id: number, method: RequestMethod): RepositoryRequest<T> {
        const request = new RepositoryRequest<T>(this);
        request.url = this.getApiUrl(className);
        if (this.authToken) {
            request.auth(this.authToken);
        }
        if (!request.url) {
            throw new Error('Try to use respositories with a non register model. Don\'t forget to register all model with addManageClass.');
        }
        if (id) {
            request.url += `/${id}`;
        }
        request.method = method;
        return request;
    }

    public execute(request: RepositoryRequest<any>): Observable<any> {
        let res: Observable<Response>;
        const url = `${this.baseHttpService.config.baseUrl}/${request.url}`;
        switch (request.method) {
            case RequestMethod.Post:
                res = this.http.post(url, request.body, request.options);
                break;
            case RequestMethod.Put:
                res = this.http.put(url, request.body, request.options);
                break;
            case RequestMethod.Get:
                res = this.http.get(url, request.options);
                break;
            case RequestMethod.Delete:
                res = this.http.get(url, request.options);
                break;
        }

        return this.baseHttpService.handleResponse(res);
    }
}