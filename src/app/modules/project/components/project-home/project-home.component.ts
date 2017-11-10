import { ClientDialogComponent } from './../../../client/components/commons/client-dialog/client-dialog.component';
import { CreateNoteComponent } from './../common/create-note/create-note.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, HostBinding } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { RepositoriesService } from 'app/modules/core';
import { Project, ProjectState, Note, Profile } from 'app/models';
import { User } from 'app/modules/core/models/user.model';
import { Client } from 'app/models';
import { Address } from 'app/models';
import { ProjectActions } from '../../../store/reducers/project/project.actions';
import { Observable } from 'rxjs/Rx';
import { IAppState } from 'app/modules/store';
import { NoteActions } from '../../../store/reducers/note/note.actions';
import { Router } from '@angular/router';
import { projectHomeAnimation } from './project-home.animation';
import { leaveWorkaround } from 'app/animations';
import { ModelUtils } from '../../../core/models/model.utils';

@Component({
  selector: 'project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
  animations: [leaveWorkaround]
})
export class ProjectHomeComponent implements OnInit {

  // @HostBinding('@leaveWorkaround') anim = true;

  @select(['profile', 'profile'])
  profile$: Observable<Profile>;

  @select(['projects', 'items'])
  projects$: Observable<Project[]>;

  @select(['projects', 'loading'])
  loading$: Observable<boolean>;

  @select(['notes', 'items'])
  notes$: Observable<Note[]>;

  @select(['notes', 'loading'])
  notesLoading$: Observable<boolean>;

  state: string = null;

  constructor(
    private _ngRedux: NgRedux<IAppState>,
    private _projectActions: ProjectActions,
    private _noteActions: NoteActions,
    private _router: Router,
    private dialog: MatDialog
  ) { }

  public ngOnInit() {
  }

  public toggleProjectCreation() {
    this._router.navigate(['createProject']);
  }

  public delete(project) {
    this._projectActions.dispatchDelete(project);
  }

  public onSelectionStarts(project) {
    this.state = 'selecting';
  }

  public onSelectionEnds(project) {
    this._router.navigate(['./project', project.id, 'dashboard']);
  }

  public openCreateNote() {
    const ref = this.dialog.open(CreateNoteComponent);
    ref.afterClosed().subscribe(note => {
      if (note) {
        this.createNote(note);
      }
    });
  }

  public openClientDialog() {
    this.dialog.open(ClientDialogComponent);
  }

  public createNote(note: Note) {
    this._noteActions.dispatchCreate(note);
  }

  public editNote(note: Note) {
    this._noteActions.dispatchUpdate(note);
  }

  public deleteNote(note: Note) {
    this._noteActions.dispatchDelete(note);
  }








  listLoading = false;
  seq = 2;
  // items = [{ id: 1, title: 'item 1' }, { id: 2, title: 'item 2' }, { id: 3, title: 'item 3' }, { id: 4, title: 'item 4' }, { id: 5, title: 'item 5' }, { id: 6, title: 'item 6' }];
  // items = [{ id: 1, title: 'item 1' }, { id: 2, title: 'item 2' }, { id: 3, title: 'item 3' }];
  items = [{ id: 1, title: 'item 1' }, { id: 2, title: 'item 2' }];
  toggleLoading() {
    if (this.listLoading) {
      this.listLoading = false;
      this.items = [{ id: 1, title: 'item 1' }, { id: 2, title: 'item 2' }];
    }
    else {
      this.listLoading = true;
      this.items = [];
    }
  }

  itemRemove(itemToRemove) {
    const i = this.items.findIndex(item => item.title === itemToRemove.title);
    if (i != -1) {
      this.items = ModelUtils.immutableRemove(this.items, this.items[i].id);
    }
  }

  itemRemoveDouble(itemToRemove) {
    const i = this.items.findIndex(item => item.title === itemToRemove.title);
    this.items = ModelUtils.immutableRemove(this.items, this.items[i].id);
    this.items = ModelUtils.immutableRemove(this.items, this.items[i + 1].id);
  }

  addItem() {
    this.seq++;
    const elt = { id: this.seq, title: `item ${this.seq}` };
    const position = 1;
    this.items = [...this.items.slice(0, position), elt, ...this.items.slice(position)]
  }

  addTwoItem() {
    this.seq++;
    const elt = { id: this.seq, title: `item ${this.seq}` };
    this.seq++;
    const elt2 = { id: this.seq, title: `item ${this.seq}` };
    const position = 2;
    this.items = [...this.items.slice(0, position), elt, elt2, ...this.items.slice(position)]
  }
}
