import { Component, OnInit, HostBinding, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Project, Note, HistoryEntry, ProjectState, Devis, Client } from 'app/models';
import { slideInDownAnimation, rightSlideApparitionAnimation, slideApparitionAnimation, centerApparitionAnimation } from 'app/animations';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, ProjectActions, SelectedProjectActions, ProjectNoteActions, ProjectHistoryEntryActions, ProjectTaskActions, ProjectClientActions, ProjectInvoiceActions } from 'app/modules/store';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { InplaceComponent } from "app/modules/shared/components/inplace/inplace.component";
import { NgForm } from '@angular/forms';
import { NotificationService } from 'app/modules/core';
import { ClientActions } from "app/modules/store/reducers/client/client.actions";
import { ProjectDevisActions } from '../../../../store/reducers/project-devis/project-devis.actions';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss'],
  animations: [slideInDownAnimation, rightSlideApparitionAnimation, slideApparitionAnimation, centerApparitionAnimation]
})
export class ProjectDashboardComponent implements OnInit, OnDestroy {
  @HostBinding('class') hostClasses = 'd-flex flex-row justify-content-between flex-column flex-lg-row flex-xl-row';

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

  @ViewChild('projectNameInplace')
  projectNameInplace: InplaceComponent;

  @select(['projectClient', 'loading'])
  loadingClient$: Observable<boolean>;

  clients: Client[] = [];

  allClients: Client[] = [];

  project: Project;

  subscriptions: Subscription[] = [];

  @select(ProjectDevisActions.totalWaiting)
  totalWaitingDevis$: Observable<number>;

  @select(ProjectDevisActions.totalAccepted)
  totalAcceptedDevis$: Observable<number>;

  @select(ProjectInvoiceActions.totalWaiting)
  totalWaitingInvoices$: Observable<number>;

  @select(ProjectInvoiceActions.totalAccepted)
  totalAcceptedInvoices$: Observable<number>;

  constructor(
    private _ngRedux: NgRedux<IAppState>,
    private _projectAction: ProjectActions,
    private _clientAction: ClientActions,
    private _projectNoteActions: ProjectNoteActions,
    private _projectHistoryActions: ProjectHistoryEntryActions,
    private _projectClientActions: ProjectClientActions,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.subscriptions.push(this._ngRedux.select(SelectedProjectActions.currentProject).subscribe(p => this.project = Object.assign({}, p)));
    this.subscriptions.push(this._ngRedux.select(['projectClient', 'items']).subscribe(clients => this.clients = Object.assign([], clients)));
    this.subscriptions.push(this._ngRedux.select(['clients', 'items']).subscribe(clients => this.allClients = Object.assign([], clients)));
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  public saveProject() {
    this._projectAction.dispatchUpdate(this.project);
  }

  public saveProjectName(form: NgForm) {
    if (form.valid) {
      this.project.name = form.value.name;
      this.project.description = form.value.description;
      this.saveProject();
      this.projectNameInplace.toggle();
    }
  }

  public changeState(state: ProjectState) {
    const project = ProjectActions.findProject(this._ngRedux.getState(), this.project.id);
    this._projectAction.dispatchUpdateState(project, state);
  }

  public createNote(note: Note) {
    this._projectNoteActions.dispatchCreate(note, this.project.id);
  }

  public deleteNote(noteId: number) {
    this._projectNoteActions.dispatchDelete(noteId, this.project.id)
  }

  public createHistoryEntry(entry: HistoryEntry) {
    this._projectHistoryActions.dispatchCreate(entry, this.project.id);
  }

  public onDevisClicked(devis: Devis) {
    this._router.navigate(['../devis', devis.id], { relativeTo: this._route });
  }

  public addClient(client: Client) {
    this._projectClientActions.dispatchAddToProject(client, this.project.id);
  }

  public createClient(client: Client) {
    this._clientAction.dispatchCreate(client);
  }

  public removeClient(client: Client) {
    this._projectClientActions.dispatchRemoveFromProject(client.id, this.project.id);
  }

}
