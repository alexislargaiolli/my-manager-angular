import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IModel } from '../model/abstract.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export abstract class GenericService<T extends IModel> {

    protected headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(protected http: Http) { }

    public getAll(): Observable<T[]> {
        return this.http.get(this.getApiURL())
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public get(id: number): Observable<T> {
        return this.http.get(`${this.getApiURL()}/${id}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public create(body: Object): Observable<T> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post(this.getApiURL(), body, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public update(eltToUpdate: T): Observable<T> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.put(`${this.getApiURL()}/${eltToUpdate.id}`, eltToUpdate, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public delete(eltToDelete: T) {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.delete(`${this.getApiURL()}/${eltToDelete.id}`, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    protected abstract getApiURL(): string;

    protected handleError(error: any) {
        return Observable.throw(error.json().error || 'Server error');
    }

    protected BASE_URL = "http://localhost:1337/api";

}
