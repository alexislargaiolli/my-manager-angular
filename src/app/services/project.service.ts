import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/Observable';
import { Client } from './../model/client.model';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { GenericService } from './generic.service';
import { Project } from '../model/project.model';

@Injectable()
export class ProjectService extends GenericService<Project> {

    constructor(
        protected http: Http,
        protected notificationService: NotificationService,
        protected authenticationService: AuthenticationService
    ) {
        super(http, notificationService, authenticationService);
    }

    public getApiURL(): string {
        return this.BASE_URL + '/project';
    }

    public create(body: Object): Observable<Project> {
        body['user'] = this.authenticationService.userId;
        console.log(body);
        return this.http.post(this.getApiURL(), body, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    /**
     * Return the clients of a project
     * @param projectId id of the project
     */
    public getProjectClient(projectId: number): Observable<Client[]> {
        return this.http.get(`${this.getApiURL()}/${projectId}/clients`, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    /**
     * Add a client to a project
     * @param projectId id of a project
     * @param clientId id of the client to add
     */
    public addClient(projectId: number, clientId: number): Observable<Project> {
        return this.http.post(`${this.getApiURL()}/${projectId}/clients/${clientId}`, {}, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    /**
     * Remove a client from a project
     * @param projectId id of the project
     * @param clientId id of the client
     */
    public removeClient(projectId: number, clientId: number): Observable<Project> {
        return this.http.delete(`${this.getApiURL()}/${projectId}/clients/${clientId}`, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }
}
