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
     * Utils method to get todo task count with @select(TaskActions.todoTaskCount)
     * @param state
     */
    public static todoTaskCount(state: IAppState) {
        return state.projectTasks.items.reduce((total, task) => {
            if (!total[task.state]) {
                total[task.state] = 0;
            }
            total[task.state] = total[task.state] + 1;
            return total;
        }, [0, 0, 0]);
    }

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Task.name);
    }

}
