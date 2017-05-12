import { Injectable } from '@angular/core';
import { RequestMethod, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IModel } from 'app/core/generics/models/generic.model';
import { AppSettings } from 'app/app-settings';
import { RepositoryRequest } from 'app/core/generics/repositories/repository-request';
import { ErrorService } from 'app/core/services/error.service';

@Injectable()
export class RepositoriesService {

    protected BASE_URL = AppSettings.API_ENDPOINT;
    protected debug = false;
    private manageClasses: Map<string, string> = new Map();

    constructor(protected http: Http, protected errorService: ErrorService) {
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

    /**
     * Get a list if id is null, one instance if id is defined
     */
    public get<T extends IModel>(className: string, id: number): RepositoryRequest<T> {
        return this.createBaseRequest<T>(className, id, RequestMethod.Get);
    }

    /**
     * Create a base request. id can be null
     */
    private createBaseRequest<T extends IModel>(className: string, id: number, method: RequestMethod): RepositoryRequest<T> {
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

    public execute(request: RepositoryRequest<any>): Observable<any> {
        let res: Observable<Response>;
        const url = `${this.BASE_URL}/${request.url}`;
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

        return this.handleResponse(res);
    }

    protected handleResponse(response: Observable<Response>) {
        return response.map((res: Response) => {
            const data = res.json();
            this.trace(data);
            return data;
        })
            .catch(err => this.handleError(err));
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