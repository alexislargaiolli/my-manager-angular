import { NgForm } from '@angular/forms';
import { Note } from './../../../../../../models/note.model';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, HostListener } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteItemComponent implements OnInit {

  @Input()
  note: Note;

  editedNote: Note;

  @Output()
  edit: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  delete: EventEmitter<Note> = new EventEmitter<Note>();

  edition = false;

  actionsShown = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleEdit() {
    this.edition = !this.edition;
    if (this.edition) {
      this.editedNote = Object.assign({}, this.note);
      this.actionsShown = false;
    }
  }

  public editNote(ngForm: NgForm) {
    if (ngForm.valid) {
      this.edit.emit(this.editedNote);
      this.edition = false;
    }
  }

  @HostListener('mouseenter')
  @HostListener('mouseleave')
  public toggleActions() {
    if (!this.edition) {
      this.actionsShown = !this.actionsShown;
    }
  }

  keyDownFunction(event, ngForm: NgForm) {
    if (event.keyCode === 13) {
      this.editNote(ngForm);
    }
  }
}
