import { Component, OnInit, EventEmitter, Output, HostBinding } from '@angular/core';
import { Note } from 'app/models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
})
export class CreateNoteComponent implements OnInit {
  @Output()
  create: EventEmitter<Note> = new EventEmitter<Note>();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  createNote(noteForm: NgForm) {
    if (noteForm.valid) {
      this.create.emit(noteForm.value);
      this.resetForm(noteForm);
    }
  }

  resetForm(noteForm: NgForm) {
    noteForm.reset();
    noteForm.controls.priority.setValue(0);
  }

  cancelCreation(noteForm: NgForm) {
    this.resetForm(noteForm);
    this.cancel.emit();
  }

}
