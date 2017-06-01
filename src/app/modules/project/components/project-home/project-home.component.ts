import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { RepositoriesService } from 'app/modules/core';
import { Project, ProjectState, Note } from 'app/models';
import { User } from 'app/modules/core/models/user.model';
import { Client } from 'app/models';
import { Address } from 'app/models';
import { IAppState } from '../../../store/store.types';
import { ProjectActions } from '../../../store/reducers/project/project.actions';
import { Observable } from 'rxjs/Rx';
import { SelectedProjectActions } from 'app/modules/store';
import { NoteActions } from '../../../store/reducers/note/note.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css']
})
export class ProjectHomeComponent implements OnInit {

  @select(['projects', 'items'])
  projects$: Observable<Project[]>;

  @select(['projects', 'boolean'])
  loading$: Observable<boolean>;

  @select(['notes', 'items'])
  notes$: Observable<Note[]>;

  @select(['notes', 'boolean'])
  notesLoading$: Observable<boolean>;

  @select(['dashboard', 'paid'])
  totalPaid$: Observable<number>;

  @select(['dashboard', 'invoiced'])
  totalInvoiced$: Observable<number>;

  @select(['dashboard', 'potential'])
  totalPotential$: Observable<number>;

  constructor(
    private _projectActions: ProjectActions,
    private _noteActions: NoteActions,
    private _router: Router
  ) { }

  public ngOnInit() { }

  public createProject() {
    const project = new Project();
    project.name = 'Nouveau projet';
    this._projectActions.dispatchCreate(project);
  }

  public delete(project) {
    this._projectActions.dispatchDelete(project.id);
  }

  public onSelect(project) {
    this._router.navigate(['./project', project.id]);
  }

  public createNote(note) {
    this._noteActions.dispatchCreate(note);
  }

}
