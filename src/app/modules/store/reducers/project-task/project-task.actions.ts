import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Task } from 'app/models';
import { IAppState } from 'app/modules/store';
import { ModelActions } from '../model/model.actions';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ProjectTaskActions extends ModelActions<Task> {

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _repo: RepositoriesService) {
        super(_ngRedux, _repo, Task.name)
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
}
