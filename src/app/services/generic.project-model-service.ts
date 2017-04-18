import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IModel } from 'app/core/generics/models/generic.model';
import { GenericService } from 'app/core/generics/services/generic.service';

/**
 * Generic service for project child model
 */
export abstract class GenericProjectModelService<T extends IModel> extends GenericService<T> {

    protected getByProjectBaseUrl(projectId: number) {
        return `${this.BASE_URL}/projects/${projectId}/${this.getModelName()}`;
    }

    /**
     * Get the model by project
     * @param projectId ID of the project
     */
    public getByProject(projectId: number): Observable<T[]> {
        const url = this.getByProjectBaseUrl(projectId);
        return this.http.get(url, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    /**
     * Create an element
     * @param projectId id of a project
     * @param body element to create
     */
    public createByProject(projectId: number, body: Object): Observable<T> {
        const url = this.getByProjectBaseUrl(projectId);
        return this.http.post(url, body, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    /**
     * Update an element
     * @param projectId id of a project
     * @param attibutes attributes to update [{attributeName : newValue}]
     */
    public updateByProject(projectId: number, element: T): Observable<T> {
        const url = this.getByProjectBaseUrl(projectId);
        return this.http.put(`${url}/${element.id}`, element, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    /**
     * Remove a element
     * @param projectId id of the project
     * @param eltId id of the element to delete
     */
    public deleteByProject(projectId: number, eltId: number) {
        const url = this.getByProjectBaseUrl(projectId);
        return this.http.delete(`${url}/${eltId}`, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    /**
     * Remove an element from the relation but do not delete it
     * @param projectId id of a project
     * @param eltId id of the element to remove
     */
    public removeFromProject(projectId: number, eltId: number) {
        const url = this.getByProjectBaseUrl(projectId);
        return this.http.delete(`${url}/rel/${eltId}`, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

    /**
     * Add an existing element to the relation with project
     * @param projectId id of project
     * @param eltId id of an element to add
     */
    public addToProject(projectId: number, eltId: number): Observable<Object> {
        const url = this.getByProjectBaseUrl(projectId);
        return this.http.put(`${url}/rel/${eltId}`, {}, this.generateOptions())
            .map((res: Response) => res.json())
            .catch(err => this.handleError(err));
    }

}
