import { Observable } from 'rxjs/Observable';
import { Client } from './../model/client.model';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { GenericService } from './generic.service';
import { Project } from '../model/project.model';

@Injectable()
export class ProjectService extends GenericService<Project> {

    constructor(protected http: Http) {
        super(http);
    }

    public getApiURL(): string {
        return this.BASE_URL + '/project';
    }

    /**
     * Return the clients of a project
     * @param projectId id of the project
     */
    public getProjectClient(projectId: number): Observable<Client[]> {
        return this.http.get(`${this.getApiURL()}/${projectId}/clients`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Add a client to a project
     * @param projectId id of a project
     * @param clientId id of the client to add
     */
    public addClient(projectId: number, clientId: number): Observable<Project> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post(`${this.getApiURL()}/${projectId}/clients/${clientId}`, {}, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    /**
     * Remove a client from a project
     * @param projectId id of the project
     * @param clientId id of the client
     */
    public removeClient(projectId: number, clientId: number): Observable<Project> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.delete(`${this.getApiURL()}/${projectId}/clients/${clientId}`, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
}
