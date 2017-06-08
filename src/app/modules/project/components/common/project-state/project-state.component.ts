import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { state } from '@angular/animations';
import { ProjectState } from 'app/models';

@Component({
  selector: 'app-project-state',
  templateUrl: './project-state.component.html',
  styleUrls: ['./project-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectStateComponent implements OnInit {

  @Input()
  state: ProjectState;

  @Output()
  change: EventEmitter<ProjectState> = new EventEmitter<ProjectState>();

  allState = ProjectState;

  constructor() { }

  ngOnInit() { }

  onChange(event) {
    console.log(+event.value);
    this.change.emit(+event.value);
  }

  changeState(state: ProjectState) {
    this.change.emit(state);
  }

}
