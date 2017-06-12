import { Component, OnInit, HostBinding } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { RepositoriesService } from 'app/modules/core';
import { Project, ProjectState, Note, Profile } from 'app/models';
import { User } from 'app/modules/core/models/user.model';
import { Client } from 'app/models';
import { Address } from 'app/models';
import { IAppState } from '../../../store/store.types';
import { ProjectActions } from '../../../store/reducers/project/project.actions';
import { Observable } from 'rxjs/Rx';
import { SelectedProjectActions } from 'app/modules/store';
import { NoteActions } from '../../../store/reducers/note/note.actions';
import { Router } from '@angular/router';
import { projectHomeAnimation } from './project-home.animation';
import { rightSlideApparitionAnimation, slideApparitionAnimation, centerApparitionAnimation } from 'app/animations';

@Component({
  selector: 'project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
  animations: [projectHomeAnimation, rightSlideApparitionAnimation, slideApparitionAnimation, centerApparitionAnimation]
})
export class ProjectHomeComponent implements OnInit {

  @HostBinding('class') containerClasses = 'd-flex ';

  @select(['profile', 'profile'])
  profile$: Observable<Profile>;

  @select(['projects', 'items'])
  projects$: Observable<Project[]>;

  @select(['projects', 'boolean'])
  loading$: Observable<boolean>;

  @select(['notes', 'items'])
  notes$: Observable<Note[]>;

  @select(['notes', 'boolean'])
  notesLoading$: Observable<boolean>;

  @select(['dashboard', 'waitingDevis'])
  waitingDevis$: Observable<number>;

  @select(['dashboard', 'acceptedDevis'])
  acceptedDevis$: Observable<number>;

  @select(['dashboard', 'waitingInvoices'])
  waitingInvoices$: Observable<number>;

  @select(['dashboard', 'paidInvoices'])
  paidInvoices$: Observable<number>;

  state: string = null;

  constructor(
    private _projectActions: ProjectActions,
    private _noteActions: NoteActions,
    private _router: Router
  ) { }

  public ngOnInit() { }

  public createProject(event) {
    const project = new Project();
    project.name = 'Nouveau projet';
    this._projectActions.dispatchCreate(project);
  }

  public delete(project) {
    this._projectActions.dispatchDelete(project.id);
  }

  public onSelectionStarts(project) {
    this.state = 'selecting';
  }

  public onSelectionEnds(project) {
    this._router.navigate(['./project', project.id]);
  }

  public createNote(note) {
    this._noteActions.dispatchCreate(note);
  }

}
