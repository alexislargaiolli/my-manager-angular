import { RequestOptions, RequestMethod, Http, Headers } from '@angular/http';
import { RepositoriesService } from './repositories.service';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';
import { User } from '../../models/user.model';

export class RepositoryRequest<T> {
    url: string;
    options: RequestOptions;
    method: RequestMethod;
    private _includes: string[] = null;
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
            const prefix = this.repositoriesService.getApiUrl(User.name);
            this.url = `${prefix}/${this.repositoriesService.session.userId}/${this.url}`;
        }
        return this;
    }

    public include(field: string): RepositoryRequest<T> {
        if (this._includes === null) {
            this._includes = [];
        }
        this._includes.push(field);
        return this;
    }

    public auth(token: string): RepositoryRequest<T> {
        this.options.headers.append('Authorization', token);
        return this;
    }

    public overrideModelUrl(url, modelName): RepositoryRequest<T> {
        const modelUrl = this.repositoriesService.getApiUrl(modelName);
        this.url = this.url.replace(modelUrl, url)
        return this;
    }

    public disableAuth(): RepositoryRequest<T> {
        this.options.headers.delete('Authorization');
        return this;
    }

    public exec(): Observable<any> {
        if (this._includes !== null && this._includes.length > 0) {
            this.url = this._includes.reduce((previousUrl: string, include, i) => `${previousUrl}${i > 0 ? '&' : '?'}filter[include][${include}]`, this.url);
        }
        return this.repositoriesService.execute(this);
    }
}
