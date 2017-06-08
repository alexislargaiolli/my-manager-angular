import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Task } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NgForm } from '@angular/forms';
import { centerApparitionAnimation } from 'app/animations';

@Component({
  selector: 'app-task-kaban',
  templateUrl: './task-kaban.component.html',
  styleUrls: ['./task-kaban.component.scss'],
  animations: [centerApparitionAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskKabanComponent implements OnInit {

  @Input('todoTasks')
  todoTasks$: Observable<Task[]>;

  @Input('inProgressTasks')
  inProgressTasks$: Observable<Task[]>;

  @Input('finishedTasks')
  finishedTasks$: Observable<Task[]>;

  @Output()
  stateChange: EventEmitter<IKabanChangeStateEvent> = new EventEmitter<IKabanChangeStateEvent>();

  @Output()
  create: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private _dragulaService: DragulaService) { }

  ngOnInit() {
    this._dragulaService.drop.subscribe((value) => {
      const nextState: number = +value[2].getAttribute('column-id');
      const taskId = +value[1].getAttribute('task-id');
      const previousState: number = +value[3].getAttribute('column-id');
      this.stateChange.emit({ taskId, previousState, nextState });
    });
  }

  createTask(taskForm: NgForm) {
    if (taskForm.valid) {
      this.create.emit(taskForm.value)
      taskForm.reset();
    }
  }

}

export interface IKabanChangeStateEvent {
  taskId: number;
  previousState: number;
  nextState: number
}
