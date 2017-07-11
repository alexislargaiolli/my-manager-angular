import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from 'app/models';

@Component({
  selector: 'app-task-edition',
  templateUrl: './task-edition.component.html',
  styleUrls: ['./task-edition.component.css']
})
export class TaskEditionComponent implements OnInit {

  _task: Task;

  @Output()
  save: EventEmitter<Task> = new EventEmitter<Task>();

  @Output()
  cancel: EventEmitter<Task> = new EventEmitter<Task>();

  @Output()
  delete: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {
  }

  public saveTask() {
    this.save.emit(this.task);
  }

  public cancelModif() {
    this.cancel.emit(this.task);
  }

  public deleteTask() {
    this.delete.emit(this.task);
  }

  get task(): Task {
    return this._task;
  }

  @Input('task')
  set task(task: Task) {
    this._task = Object.assign(new Task(), task);
  }

}
