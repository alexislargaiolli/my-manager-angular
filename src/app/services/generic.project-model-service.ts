import { IProjectModel } from './../model/abstract-project.model';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs/Observable';
import { IModel } from '../model/abstract.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Generic service for project child model
 */
export abstract class GenericProjectModelService<T extends IProjectModel> extends GenericService<T> {

    /**
     * Get the model by project
     * @param projectId ID of the project
     */
    public getByProject(projectId: number): Observable<T[]> {
        const url = `${this.getApiURL()}?where={"project":"${projectId}"}`;
        return this.http.get(url, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err=>this.handleError(err));
    }

    /**
     * Get elements not related to a project
     */
    public getGenerals(): Observable<T[]> {
        const url = `${this.getApiURL()}?where={"project":null}`;
        return this.http.get(url, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err=>this.handleError(err));
    }

}
