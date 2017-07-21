import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { ProjectTaskActions } from '../../../../store/reducers/project-task/project-task.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState, ProjectNoteActions } from 'app/modules/store';
import { NgForm } from '@angular/forms';
import { trigger, transition, query, style, animate, animateChild, state } from '@angular/animations';

@Component({
  selector: 'app-project-note-list',
  templateUrl: './project-note-list.component.html',
  styleUrls: ['./project-note-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectNoteListComponent implements OnInit {

  @Input()
  notes: Note[];

  @Input()
  loading: boolean;

  @Output()
  delete: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  edit: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() { }

  ngOnInit() {
  }

}
