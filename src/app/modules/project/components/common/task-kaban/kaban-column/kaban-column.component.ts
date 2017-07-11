import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Task, TaskState } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { listSlideAnim } from 'app/animations';

@Component({
  selector: 'app-kaban-column',
  templateUrl: './kaban-column.component.html',
  styleUrls: ['./kaban-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KabanColumnComponent implements OnInit {

  @Input()
  tasks: Task[];

  @Input()
  name: string;

  @Input()
  columnId: number;

  @Output()
  select: EventEmitter<Task> = new EventEmitter<Task>();

  public state = TaskState;

  constructor() { }

  ngOnInit() {

  }

  public selectTask(task: Task) {
    this.select.emit(task);
  }

}
