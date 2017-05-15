import { Project } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { Task, TaskState } from 'app/models';
import { ErrorService, EventsService, CurrentSession } from 'app/modules/core';

@Injectable()
export class TaskService extends GenericProjectModelService<Task> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService
    ) {
        super(http, errorService, currentSession, eventsService);
    }

    protected getModelName(): string {
        return 'tasks';
    }
}
