import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { Task, TaskState } from '../model/task.model';

@Injectable()
export class TaskService extends GenericProjectModelService<Task> {

    constructor(
        protected http: Http,
        protected notificationService: NotificationService,
        protected authenticationService: AuthenticationService
    ) {
        super(http, notificationService, authenticationService);
    }

    protected getApiURL(): string {
        return this.BASE_URL + '/task';
    }
}
