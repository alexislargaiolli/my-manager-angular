import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Component, OnInit, Inject, Input, HostBinding } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Task, TaskState, TaskKaban } from 'app/models';
import { IAppState, ProjectTaskActions } from 'app/modules/store';
import { select, NgRedux } from '@angular-redux/store';
import { IKabanChangeStateEvent } from '../../common/task-kaban/task-kaban.component';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss']
})
export class ProjectTaskComponent implements OnInit {

  @select(ProjectTaskActions.findTodoTask)
  todoTasks$: Observable<Task[]>;

  @select(ProjectTaskActions.findInProgressTask)
  inProgressTasks$: Observable<Task[]>;

  @select(ProjectTaskActions.findFinishedTask)
  finishedTasks$: Observable<Task[]>;

  @select(['projectTasks', 'loading'])
  loading: Observable<boolean>;

  constructor(private _taskAction: ProjectTaskActions, private _ngRedux: NgRedux<IAppState>) {
  }

  public ngOnInit() { }

  public onStateChanged(event: IKabanChangeStateEvent) {
    const previousTask = this._ngRedux.getState().projectTasks.items.find(t => t.id === event.taskId);
    const task = Object.assign({}, previousTask, { state: event.nextState });

    this._taskAction.dispatchUpdate(task, this._ngRedux.getState().selectedProject.id);
  }

  public createTask(task) {
    this._taskAction.dispatchCreate(task, this._ngRedux.getState().selectedProject.id);
  }

  public deleteTask(taskId: number) {
    this._taskAction.dispatchDelete(taskId, this._ngRedux.getState().selectedProject.id);
  }

}
