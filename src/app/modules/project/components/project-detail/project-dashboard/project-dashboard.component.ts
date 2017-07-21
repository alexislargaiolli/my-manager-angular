import { Location } from '@angular/common';
import { AbstractProjectComponent } from './../abstract-project.component';
import { CreateNoteComponent } from './../../common/create-note/create-note.component';
import { MdDialog } from '@angular/material';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Project, Note, HistoryEntry, ProjectState, Devis, Client } from 'app/models';
import { leaveWorkaround } from 'app/animations';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, ProjectActions, SelectedProjectActions, ProjectNoteActions, ProjectHistoryEntryActions, ProjectTaskActions, ProjectClientActions, ProjectInvoiceActions } from 'app/modules/store';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { InplaceComponent } from 'app/modules/shared/components/inplace/inplace.component';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'app/modules/core';
import { ClientActions } from 'app/modules/store/reducers/client/client.actions';
import { ProjectDevisActions } from '../../../../store/reducers/project-devis/project-devis.actions';
import { ReduxSubscriptionComponent } from '../../../../core/components/redux-subscription-component/redux-subscription-component';

@Component({
    selector: 'app-project-dashboard',
    templateUrl: './project-dashboard.component.html',
    styleUrls: ['./project-dashboard.component.scss'],
    animations: [
        leaveWorkaround
    ]
})
export class ProjectDashboardComponent extends AbstractProjectComponent implements OnInit, OnDestroy {

    @HostBinding('@leaveWorkaround') anim = true;

    @ViewChild('projectNameInplace')
    projectNameInplace: InplaceComponent;

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

    @select(['projectClient', 'loading'])
    loadingClient$: Observable<boolean>;

    taskSummary: number[];
    devisSummary: number[];
    invoiceSummary: number[];
    clients: Client[] = [];
    allClients: Client[] = [];

    constructor(
        protected _ngRedux: NgRedux<IAppState>,
        private _projectAction: ProjectActions,
        private _clientAction: ClientActions,
        private _projectNoteActions: ProjectNoteActions,
        private _projectHistoryActions: ProjectHistoryEntryActions,
        private _projectClientActions: ProjectClientActions,
        protected _router: Router,
        private _route: ActivatedRoute,
        private dialog: MdDialog,
        protected _location: Location
    ) { super(_ngRedux, _location); }

    public ngOnInit() {
        super.ngOnInit();
        this.addSub(this._ngRedux.select(['projectClient', 'items']).subscribe(clients => this.clients = Object.assign([], clients)));
        this.addSub(this._ngRedux.select(['clients', 'items']).subscribe(clients => this.allClients = Object.assign([], clients)));
        this.addSub(this._ngRedux.select(ProjectTaskActions.todoTaskCount).subscribe((taskSummary: number[]) => this.taskSummary = taskSummary));
        this.addSub(this._ngRedux.select(ProjectDevisActions.devisSummary).subscribe((summary) => this.devisSummary = summary));
        this.addSub(this._ngRedux.select(ProjectInvoiceActions.invoiceSummary).subscribe((summary) => this.invoiceSummary = summary));
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

    public openCreateNote() {
        const ref = this.dialog.open(CreateNoteComponent);
        ref.afterClosed().subscribe(note => {
            if (note) {
                this.createNote(note);
            }
        });
    }

    public createNote(note: Note) {
        this._projectNoteActions.dispatchCreate(note, this.project.id);
    }

    public editNote(note: Note) {
        this._projectNoteActions.dispatchUpdate(note, this.project.id);
    }

    public deleteNote(note: Note) {
        this._projectNoteActions.dispatchDelete(note, this.project.id)
    }

    public createHistoryEntry(entry: HistoryEntry) {
        this._projectHistoryActions.dispatchCreate(entry, this.project.id);
    }

    public loadMoreHistoryEntry() {
        this._projectHistoryActions.dispatchLoadMore(this.project.id, 10, this._ngRedux.getState().projectHistory.items.length);
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
