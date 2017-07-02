import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Note, NotePriority } from 'app/models';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NoteActions } from '../../../../store/reducers/note/note.actions';
import { slideApparitionAnimation, fadeAnim, listSlideAnim } from 'app/animations';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  animations: [slideApparitionAnimation, fadeAnim, listSlideAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListComponent implements OnInit {

  @Input()
  notes: Note[];

  @Input()
  loading: boolean;

  @Output()
  create: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  toggle: EventEmitter<Note> = new EventEmitter<Note>();

  _showForm: boolean = false;

  constructor(private _dragulaService: DragulaService) {
    _dragulaService.setOptions('notes', {
      removeOnSpill: true
    });
    _dragulaService.remove.subscribe((value) => {
      const noteId = +value[1].getAttribute('note-id');
      this.delete.emit(noteId);
    });
  }

  createNote(noteForm: NgForm) {
    if (noteForm.valid) {
      this.showForm = false;
      this.create.emit(noteForm.value);
    }
  }

  cancel(noteForm: NgForm) {
    noteForm.reset();
    this.showForm = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('notes');
  }

  get showForm() {
    return this._showForm;
  }

  set showForm(showForm) {
    this._showForm = showForm;
  }

}
