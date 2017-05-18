import { Component, OnInit, HostBinding, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Project, Note, HistoryEntry, ProjectState, Devis } from 'app/models';
import { slideInDownAnimation } from 'app/animations';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, ProjectActions, SelectedProjectActions, ProjectNoteActions, ProjectHistoryEntryActions, ProjectTaskActions } from 'app/modules/store';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  @select(SelectedProjectActions.currentProject)
  currentProject$: Observable<Project>;

  @select(ProjectTaskActions.todoTaskCount)
  totalTodo$: Observable<number[]>;

  @select(['projectNotes', 'items'])
  notes$: Observable<Note[]>;

  @select(['projectNotes', 'loading'])
  notesLoading$: Observable<boolean>;

  @select(['projectHistory', 'items'])
  historyEntries$: Observable<HistoryEntry[]>;

  @select(['projectHistory', 'loading'])
  historyLoading$: Observable<boolean>;

  @select(['projectDevis', 'items'])
  devis$: Observable<Devis[]>;

  @select(['projectDevis', 'loading'])
  devisLoading$: Observable<boolean>;

  constructor(
    private _ngRedux: NgRedux<IAppState>,
    private _projectAction: ProjectActions,
    private _projectNoteActions: ProjectNoteActions,
    private _projectHistoryActions: ProjectHistoryEntryActions,
    private _router: Router
  ) { }

  public ngOnInit() { }

  public changeState(state: ProjectState) {
    const project = ProjectActions.findProject(this._ngRedux.getState(), this._ngRedux.getState().selectedProject.id);
    this._projectAction.dispatchUpdateState(project, state);
  }

  public createNote(note: Note) {
    this._projectNoteActions.dispatchCreate(note, this._ngRedux.getState().selectedProject.id);
  }

  public createHistoryEntry(entry: HistoryEntry) {
    this._projectHistoryActions.dispatchCreate(entry, this._ngRedux.getState().selectedProject.id);
  }

  public onDevisClicked(devis: Devis) {
    this._router.navigate(['./devis', devis.id]);
  }

}
