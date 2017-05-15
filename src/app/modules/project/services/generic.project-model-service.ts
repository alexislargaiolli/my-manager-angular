import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Project } from 'app/models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IModel } from 'app/modules/core';
import { GenericService } from 'app/modules/core';

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
        return this.handleResponse(this.http.get(url, this.generateOptions()));
    }

    public getOneByProject(projectId: number, id: number): Observable<T> {
        const url = this.getByProjectBaseUrl(projectId);
        return this.handleResponse(this.http.get(`${url}/${id}`, this.generateOptions()));
    }

    /**
     * Create an element if id is null, update it otherwise
     * @param projectId id of a project
     * @param body element to save
     */
    public saveByProject(projectId: number, body): Observable<T> {
        if (body['id']) {
            return this.updateByProject(projectId, body);
        }
        return this.createByProject(projectId, body);
    }

    /**
     * Create an element
     * @param projectId id of a project
     * @param body element to create
     */
    public createByProject(projectId: number, body: Object): Observable<T> {
        const url = this.getByProjectBaseUrl(projectId);
        return this.handleResponse(this.http.post(url, body, this.generateOptions()));
    }

    /**
     * Update an element
     * @param projectId id of a project
     * @param attibutes attributes to update [{attributeName : newValue}]
     */
    public updateByProject(projectId: number, element: T): Observable<T> {
        const url = this.getByProjectBaseUrl(projectId);
        return this.handleResponse(this.http.put(`${url}/${element.id}`, element, this.generateOptions()));
    }

    /**
     * Remove a element
     * @param projectId id of the project
     * @param eltId id of the element to delete
     */
    public deleteByProject(projectId: number, eltId: number) {
        const url = this.getByProjectBaseUrl(projectId);
        return this.handleResponse(this.http.delete(`${url}/${eltId}`, this.generateOptions()));
    }

    /**
     * Remove an element from the relation but do not delete it
     * @param projectId id of a project
     * @param eltId id of the element to remove
     */
    public removeFromProject(projectId: number, eltId: number) {
        const url = this.getByProjectBaseUrl(projectId);
        return this.handleResponse(this.http.delete(`${url}/rel/${eltId}`, this.generateOptions()));
    }

    /**
     * Add an existing element to the relation with project
     * @param projectId id of project
     * @param eltId id of an element to add
     */
    public addToProject(projectId: number, eltId: number): Observable<Object> {
        const url = this.getByProjectBaseUrl(projectId);
        return this.handleResponse(this.http.put(`${url}/rel/${eltId}`, {}, this.generateOptions()));
    }

}
