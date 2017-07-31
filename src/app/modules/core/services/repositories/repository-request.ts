import { RequestOptions, RequestMethod, Http, Headers } from '@angular/http';
import { RepositoriesService } from './repositories.service';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';
import { User } from '../../models/user.model';
import { RequestFilter } from './filter.type';

export class RepositoryRequest<T> {
    url: string;
    options: RequestOptions;
    method: RequestMethod;
    private _filters: RequestFilter[] = [];
    body: any;

    constructor(private repositoriesService: RepositoriesService) {
        const headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.options = new RequestOptions({ headers: headers });
    }

    public by(className: string, id: number): RepositoryRequest<T> {
        const prefix = this.repositoriesService.getApiUrl(className);
        this.url = `${prefix}/${id}/${this.url}`;
        return this;
    }

    public byCurrentUser(): RepositoryRequest<T> {
        if (this.repositoriesService.session) {
            const prefix = this.repositoriesService.getApiUrl(User.REPO_KEY);
            this.url = `${prefix}/${this.repositoriesService.session.userId}/${this.url}`;
        }
        return this;
    }

    public addUserIdToBody(): RepositoryRequest<T> {
        if (this.repositoriesService.session) {
            this.body.userId = this.repositoriesService.session.userId;
        }
        return this;
    }

    public include(field: string): RepositoryRequest<T> {
        this._filters.push({ type: 'include', value: field });
        return this;
    }

    public orderBy(field: string, desc?: boolean): RepositoryRequest<T> {
        this._filters.push({ type: 'order', value: `${field}${desc ? ' DESC' : ' ASC'}` });
        return this;
    }

    public limit(limit: number): RepositoryRequest<T> {
        this._filters.push({ type: 'limit', value: limit });
        return this;
    }

    public skip(skip: number): RepositoryRequest<T> {
        this._filters.push({ type: 'skip', value: skip });
        return this;
    }

    public field(field: string): RepositoryRequest<T> {
        this._filters.push({ type: 'fields', property: field, value: true });
        return this;
    }

    public where(field: string, value: any): RepositoryRequest<T> {
        this._filters.push({ type: 'where', property: field, value: value });
        return this;
    }

    public auth(token: string): RepositoryRequest<T> {
        this.options.headers.append('Authorization', token);
        return this;
    }

    public overrideModelUrl(url, modelName): RepositoryRequest<T> {
        const modelUrl = this.repositoriesService.getApiUrl(modelName);
        this.url = this.url.replace(modelUrl, url);
        return this;
    }

    public disableAuth(): RepositoryRequest<T> {
        this.options.headers.delete('Authorization');
        return this;
    }

    public exec(): Observable<any> {
        this.url = this._filters.reduce((previousUrl: string, filter: RequestFilter, i) => `${previousUrl}${i > 0 ? '&' : '?'}filter[${filter.type}]${filter.property ? '[' + filter.property + ']' : ''}=${filter.value}`, this.url);
        return this.repositoriesService.execute(this);
    }
}
