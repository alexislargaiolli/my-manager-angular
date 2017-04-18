import { AuthenticationService } from './authentication.service';
import { Project } from '../model/project.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GenericProjectModelService } from './generic.project-model-service';
import { Task, TaskState } from '../model/task.model';
import { ErrorService } from 'app/core/services/error.service';
import { EventsService } from 'app/core/services/event.service';
import { CurrentSession } from 'app/core/services/session.service';

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
