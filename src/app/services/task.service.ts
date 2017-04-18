import { AuthenticationService } from './authentication.service';
import { ErrorService } from 'app/services/error.service';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { Task, TaskState } from '../model/task.model';
import { EventsService } from 'app/services/event.service';

@Injectable()
export class TaskService extends GenericProjectModelService<Task> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected authenticationService: AuthenticationService,
        protected eventsService: EventsService
    ) {
        super(http, errorService, authenticationService, eventsService);
    }

    protected getModelName(): string {
        return 'tasks';
    }
}
