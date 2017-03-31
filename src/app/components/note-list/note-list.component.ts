import { GenericProjectListComponent } from '../generics/generic-project-list.component';
import { KeysPipe } from './../../utils/keys.pipe';
import { NgForm } from '@angular/forms';
import { Note, NotePriority } from './../../model/note.model';
import { Observable } from 'rxjs/Observable';
import { NoteService } from './../../services/note.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent extends GenericProjectListComponent<Note> implements OnInit {

  public priorities = NotePriority;

  constructor(protected noteService: NoteService, protected route: ActivatedRoute) {
    super(noteService, route);
  }

  public select(note: Note) {
    if (note.done === true) {
      note.done = false;
    } else {
      note.done = true;
    }
  }
  
}
