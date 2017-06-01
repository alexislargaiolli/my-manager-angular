import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Note, NotePriority } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NoteActions } from '../../../../store/reducers/note/note.actions';

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

  constructor(private _dragulaService: DragulaService, private _noteActions: NoteActions) {
    _dragulaService.setOptions('notes', {
      removeOnSpill: true
    });
    _dragulaService.remove.subscribe((value) => {
      const noteId = +value[1].getAttribute('note-id');
      this._noteActions.dispatchDelete(noteId);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('notes');
  }

}
