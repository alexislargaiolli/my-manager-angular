import { Location } from '@angular/common';
import { AbstractProjectComponent } from './../abstract-project.component';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Component, OnInit, Inject, Input, HostBinding, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Task, TaskState, TaskKaban } from 'app/models';
import { IAppState, ProjectTaskActions, ProjectHistoryEntryActions } from 'app/modules/store';
import { select, NgRedux } from '@angular-redux/store';
import { IKabanChangeStateEvent } from '../../common/task-kaban/task-kaban.component';
import { HistoryEntryFactory } from '../../../../../models/historyentry.factory';
import { leaveWorkaround } from 'app/animations';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss'],
  animations: [leaveWorkaround]
})
export class ProjectTaskComponent extends AbstractProjectComponent implements OnInit {

  @HostBinding('@leaveWorkaround') anim = true;

  @select(ProjectTaskActions.findTodoTask)
  todoTasks$: Observable<Task[]>;

  @select(ProjectTaskActions.findInProgressTask)
  inProgressTasks$: Observable<Task[]>;

  @select(ProjectTaskActions.findFinishedTask)
  finishedTasks$: Observable<Task[]>;

  @select(['projectTasks', 'loading'])
  loading: Observable<boolean>;

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  selectedTask: Task;

  constructor(
    protected _router: Router,
    protected _route: ActivatedRoute,
    private _taskAction: ProjectTaskActions,
    protected _ngRedux: NgRedux<IAppState>,
    private _historyActions: ProjectHistoryEntryActions) {
    super(_ngRedux, _router, _route);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public onStateChanged(event: IKabanChangeStateEvent) {
    const previousTask = this._ngRedux.getState().projectTasks.items.find(t => t.id === event.taskId);
    const task = Object.assign({}, previousTask, { state: event.nextState });
    const projectId = this._ngRedux.getState().projects.selectedId;
    this._historyActions.dispatchCreate(HistoryEntryFactory.taskStateChanged(task), projectId);
    this._taskAction.dispatchUpdate(task, projectId);
  }

  public createTask(task: Task) {
    this._taskAction.dispatchCreate(task, this._ngRedux.getState().projects.selectedId);
  }

  public updateTask(task: Task) {
    this._taskAction.dispatchUpdate(task, this._ngRedux.getState().projects.selectedId);
    this.sidenav.close();
  }

  public deleteTask(task: Task) {
    this._taskAction.dispatchDelete(task, this._ngRedux.getState().projects.selectedId);
    this.sidenav.close();
  }

  public selectTask(task: Task) {
    this.selectedTask = task;
    this.sidenav.open();
  }

  public cancelEdition(task: Task) {
    this.sidenav.close();
  }

  protected initProject(project) {
    this.title = `${project.name} - Tâches`;
  }

}
