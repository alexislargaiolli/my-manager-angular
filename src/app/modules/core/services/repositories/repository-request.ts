import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';
import { RepositoriesService } from './repositories.service';
import { RequestMethod } from '@angular/http';

export class RepositoryRequest<T> {
    url: string;
    headers: HttpHeaders;
    params = new HttpParams();
    query = "";
    method: RequestMethod;
    body: any;

    constructor(private repositoriesService: RepositoriesService) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }

    public by(className: string, id: number): RepositoryRequest<T> {
        const prefix = this.repositoriesService.getApiUrl(className);
        this.url = `${prefix}/${id}/${this.url}`;
        return this;
    }

    public byCurrentUser(): RepositoryRequest<T> {
        if (this.repositoriesService.session) {
            const prefix = this.repositoriesService.getApiUrl(User.REPO_KEY);
            this.url = `${prefix}/me/${this.url}`;
        }
        return this;
    }

    public addUserIdToBody(): RepositoryRequest<T> {
        if (this.repositoriesService.session) {
            this.body.userId = this.repositoriesService.session.userId;
        }
        return this;
    }

    public param(name: string, value: any): RepositoryRequest<T> {
        this.addQuery(`${name}=${value}`);
        return this;
    }

    public include(field: string): RepositoryRequest<T> {
        this.addQuery(`[filter][include]=${field}`);
        return this;
    }

    public orderBy(field: string, desc?: boolean): RepositoryRequest<T> {
        this.addQuery(`[filter][order]=${field}${desc ? ' DESC' : ' ASC'}`);
        return this;
    }

    public limit(limit: number): RepositoryRequest<T> {
        this.addQuery(`[filter][limit]=${limit}`);
        return this;
    }

    public skip(skip: number): RepositoryRequest<T> {
        this.addQuery(`[filter][limit]=${skip}`);
        return this;
    }

    public field(field: string): RepositoryRequest<T> {
        this.addQuery(`[filter][fields][${field}]=true`);
        return this;
    }

    public where(field: string, value: any): RepositoryRequest<T> {
        this.addQuery(`[filter][where][${field}]=${value}`);
        return this;
    }

    public overrideModelUrl(url, modelName): RepositoryRequest<T> {
        const modelUrl = this.repositoriesService.getApiUrl(modelName);
        this.url = this.url.replace(modelUrl, url);
        return this;
    }

    public exec(): Observable<any> {
        return this.repositoriesService.execute(this);
    }

    private addQuery(queryItem: string) {
        if (this.query.length === 0) {
            this.query = '?';
        } else {
            this.query += '&';
        }
        this.query += queryItem;
    }
}
