import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';
import { IAppState } from 'app/modules/store';
import { Observable } from 'rxjs/Observable';
import { IModel } from '../../models/generic.model';
import { ISessionState } from '../../models/user-session.model';
import { BaseHttpService } from './base-http.service';
import { RepositoryRequest } from './repository-request';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RepositoriesService {
    private manageClasses: Map<string, string> = new Map();

    constructor(protected http: HttpClient, private baseHttpService: BaseHttpService, private _ngRedux: NgRedux<IAppState>) {
    }

    public addManageClass(className: string, apiUrl: string) {
        this.manageClasses.set(className, apiUrl);
    }

    public getApiUrl(className: string): string {
        return this.manageClasses.get(className);
    }

    public save<T extends IModel>(className: string, body: any): RepositoryRequest<T> {
        if (body['id']) {
            return this.update<T>(className, body);
        }
        return this.create<T>(className, body);
    }

    public create<T extends IModel>(className: string, body: any): RepositoryRequest<T> {
        const request = this.createBaseRequest<T>(className, null, RequestMethod.Post);
        request.body = body;
        return request;
    }

    public update<T extends IModel>(className: string, elt: T, withoutId?: boolean): RepositoryRequest<T> {
        const request = this.createBaseRequest<T>(className, withoutId ? null : elt.id, RequestMethod.Put);
        request.body = elt;
        return request;
    }

    public patch<T extends IModel>(className: string, id: number, attributes): RepositoryRequest<T> {
        const request = this.createBaseRequest<T>(className, id, RequestMethod.Patch);
        request.body = attributes;
        return request;
    }

    public addRelation<T extends IModel>(className: string, elt: T): RepositoryRequest<T> {
        const request = this.createBaseRequest<T>(className, elt.id, RequestMethod.Put);
        request.url = request.url.replace(`/${elt.id}`, `/rel/${elt.id}`);
        return request;
    }

    public removeRelation<T extends IModel>(className: string, id: number): RepositoryRequest<T> {
        const request = this.createBaseRequest<T>(className, id, RequestMethod.Delete);
        request.url = request.url.replace(`/${id}`, `/rel/${id}`);
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
    private createBaseRequest<T>(className: string, id: number, method: RequestMethod): RepositoryRequest<T> {
        const request = new RepositoryRequest<T>(this);
        request.url = this.getApiUrl(className);
        if (!request.url) {
            throw new Error('Try to use respositories with a non register model. Don\'t forget to register all model with addManageClass.');
        }
        if (id) {
            request.url += `/${id}`;
        }
        request.method = method;
        return request;
    }

    public createCustomRequest<T>(url, method: RequestMethod): RepositoryRequest<T> {
        const request = new RepositoryRequest<T>(this);
        request.url = url;
        request.method = method;
        return request;
    }

    public execute(request: RepositoryRequest<any>): Observable<any> {
        let res: Observable<any>;
        const url = `${this.baseHttpService.config.baseUrl}/${request.url}${request.query}`;
        switch (request.method) {
            case RequestMethod.Post:
                res = this.http.post(url, request.body, { headers: request.headers });
                break;
            case RequestMethod.Put:
                res = this.http.put(url, request.body, { headers: request.headers });
                break;
            case RequestMethod.Patch:
                res = this.http.patch(url, request.body, { headers: request.headers });
                break;
            case RequestMethod.Get:
                res = this.http.get(url, { headers: request.headers });
                break;
            case RequestMethod.Delete:
                res = this.http.delete(url, { headers: request.headers });
                break;
        }

        return this.baseHttpService.handleResponse(res);
    }

    public get session(): ISessionState {
        return this._ngRedux.getState().session;
    }
}
