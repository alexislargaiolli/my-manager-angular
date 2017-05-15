import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project, Task, TaskState } from 'app/models';
import { ErrorService, EventsService, CurrentSession, GenericService } from 'app/modules/core';

@Injectable()
export class ProjectService extends GenericService<Project> {

    constructor(
        protected http: Http,
        protected errorService: ErrorService,
        protected currentSession: CurrentSession,
        protected eventsService: EventsService
    ) {
        super(http, errorService, currentSession, eventsService);
    }

    public getTaskCount(projectId: number): Observable<any> {
        return this.handleResponse(this.http.get(`${this.getBaseApiURL()}/${projectId}/tasks`, this.generateOptions())).map(tasks => {
            let results = [];
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                switch (task.state) {
                    case TaskState.TODO:
                        results[TaskState.TODO] = results[TaskState.TODO] ? results[TaskState.TODO] + 1 : 1;
                        break;
                    case TaskState.FINISHED:
                        results[TaskState.FINISHED] = results[TaskState.FINISHED] ? results[TaskState.FINISHED] + 1 : 1;
                        break;
                    case TaskState.IN_PROGRESS:
                        results[TaskState.IN_PROGRESS] = results[TaskState.IN_PROGRESS] ? results[TaskState.IN_PROGRESS] + 1 : 1;
                        break;
                    case TaskState.CANCELED:
                        results[TaskState.CANCELED] = results[TaskState.CANCELED] ? results[TaskState.CANCELED] + 1 : 1;
                        break;
                }
            }
            return results;
        });
    }

    protected getModelName(): string {
        return 'projects';
    }
}