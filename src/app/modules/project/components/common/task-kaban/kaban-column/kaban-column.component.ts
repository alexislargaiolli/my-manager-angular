import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Task, TaskState } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-kaban-column',
  templateUrl: './kaban-column.component.html',
  styleUrls: ['./kaban-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KabanColumnComponent implements OnInit {

  @Input('tasks')
  tasks$: Observable<Task[]>;

  @Input()
  name: string;

  @Input()
  columnId: number;

  public state = TaskState;

  constructor() { }

  ngOnInit() {

  }

}