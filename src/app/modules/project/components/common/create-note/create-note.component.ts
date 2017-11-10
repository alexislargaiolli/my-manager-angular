import { MatDialogRef } from '@angular/material';
import { Component, OnInit, EventEmitter, Output, HostBinding } from '@angular/core';
import { Note } from 'app/models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateNoteComponent>) { }

  ngOnInit() {
  }

  createNote(noteForm: NgForm) {
    if (noteForm.valid) {
      this.dialogRef.close(noteForm.value);
    }
  }

  resetForm(noteForm: NgForm) {
    noteForm.reset();
    noteForm.controls.priority.setValue(0);
  }

  cancelCreation(noteForm: NgForm) {
    this.dialogRef.close(noteForm.value);
  }

}
