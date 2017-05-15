import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GenericProjectListComponent } from '../generic-project-list.component';
import { NoteService } from '../../../services/note.service';
import { Note, NotePriority } from 'app/models';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent extends GenericProjectListComponent<Note> implements OnInit {

  public priorities = NotePriority;

  constructor(protected noteService: NoteService) {
    super(noteService);
  }

  public toggleState(note: Note) {
    if (note.done === true) {
      note.done = false;
    } else {
      note.done = true;
    }
    this.update(note);
  }

}
