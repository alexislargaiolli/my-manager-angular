import { Project } from '../model/project.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { Task } from '../model/task.model';

@Injectable()
export class TaskService extends GenericProjectModelService<Task> {

    constructor(protected http: Http) {
        super(http);
    }

    protected getApiURL(): string {
        return this.BASE_URL + '/api/task';
    }
}
