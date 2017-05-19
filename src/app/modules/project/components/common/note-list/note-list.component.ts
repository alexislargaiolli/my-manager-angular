import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Note, NotePriority } from 'app/models';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListComponent implements OnInit {

  @Input('notes')
  notes$: Observable<Note[]>;

  @Input('loading')
  loading$: Observable<boolean>;

  @Output()
  create: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  toggle: EventEmitter<Note> = new EventEmitter<Note>();

  constructor() { }

  ngOnInit(): void {
  }

}
