import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GenericService } from './generic.service';
import { Project } from '../model/project.model';

@Injectable()
export class ProjectService extends GenericService<Project> {

    constructor(protected http: Http) {
        super(http);
    }

    public getApiURL(): string {
        return this.BASE_URL + '/api/project';
    }
}
