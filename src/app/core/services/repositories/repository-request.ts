import { RequestOptions, RequestMethod, Http, Headers } from '@angular/http';
import { RepositoriesService } from 'app/core/services/repositories/repositories.service';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';
import { User } from 'app/core/models/user.model';

export class RepositoryRequest<T> {
    url: string;
    options: RequestOptions;
    method: RequestMethod;
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

    public auth(token: string): RepositoryRequest<T> {
        this.options.headers.append('Authorization', token);
        return this;
    }

    public disableAuth(): RepositoryRequest<T> {
        this.options.headers.delete('Authorization');
        return this;
    }

    public exec(): Observable<any> {
        return this.repositoriesService.execute(this);
    }
}