import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from 'app/models';

@Component({
  selector: 'app-project-note-list',
  templateUrl: './project-note-list.component.html',
  styleUrls: ['./project-note-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectNoteListComponent implements OnInit {

  @Input('notes')
  notes$: Observable<Note[]>;

  @Input('loading')
  loading$: Observable<boolean>;

  @Output()
  create: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  toggle: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() { }

  ngOnInit() {
  }

}
