import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, OnDestroy, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { Task } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NgForm } from '@angular/forms';
import { centerApparitionAnimation, listSlideAnim } from 'app/animations';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-task-kaban',
  templateUrl: './task-kaban.component.html',
  styleUrls: ['./task-kaban.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskKabanComponent implements OnInit, OnDestroy {

  @Input()
  todoTasks: Task[];

  @Input()
  inProgressTasks: Task[];

  @Input()
  finishedTasks: Task[];

  @Output()
  stateChange: EventEmitter<IKabanChangeStateEvent> = new EventEmitter<IKabanChangeStateEvent>();

  @Output()
  create: EventEmitter<Task> = new EventEmitter<Task>();

  @Output()
  select: EventEmitter<Task> = new EventEmitter<Task>();

  public dragulaName = 'KABAN';

  constructor(private _dragulaService: DragulaService) { }

  ngOnInit() {
    this._dragulaService.drop.subscribe((value) => {
      const nextState: number = +value[2].getAttribute('column-id');
      const taskId = +value[1].getAttribute('task-id');
      const previousState: number = +value[3].getAttribute('column-id');
      this.stateChange.emit({ taskId, previousState, nextState });
    });
  }

  ngOnDestroy() {
    this._dragulaService.destroy(this.dragulaName);
  }

  createTask(taskForm: NgForm) {
    if (taskForm.valid) {
      this.create.emit(taskForm.value)
      taskForm.reset();
    }
  }

  selectTask(task: Task) {
    this.select.emit(task);
  }

}

export interface IKabanChangeStateEvent {
  taskId: number;
  previousState: number;
  nextState: number
}
