import { ChartData } from './../../../../models/chart.model';
import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Task, TaskState } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProjectTaskActions extends ModelActions<Task> {

    public static findTodoTask(state: IAppState) {
        return state.projectTasks.items.filter(task => task.state === TaskState.TODO);
    }

    public static findInProgressTask(state: IAppState) {
        return state.projectTasks.items.filter(task => task.state === TaskState.IN_PROGRESS);
    }

    public static findFinishedTask(state: IAppState) {
        return state.projectTasks.items.filter(task => task.state === TaskState.FINISHED);
    }

    /**
     * Utils method to get todo task count with @select(TaskActions.taskSummary)
     * @param state
     */
    public static taskSummary(state: IAppState): ChartData[] {
        return state.projectTasks.items.reduce((total, task) => {
            if (!total[task.state]) {
                total[task.state].value = 0;
            }
            total[task.state].value = total[task.state].value + 1;
            return total;
        }, [
                { name: 'Tâches à faire', value: 0 },
                { name: 'Tâches en cours', value: 0 },
                { name: 'Tâches terminées', value: 0 }
            ]);
    }

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Task.REPO_KEY);
    }

}
