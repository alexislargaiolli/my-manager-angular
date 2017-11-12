import { ClientDialogComponent } from './../../../../client/components/commons/client-dialog/client-dialog.component';
import { Location } from '@angular/common';
import { AbstractProjectComponent } from './../abstract-project.component';
import { CreateNoteComponent } from './../../common/create-note/create-note.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, HostBinding, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Project, Note, HistoryEntry, ProjectState, Devis, Client, ChartData } from 'app/models';
import { leaveWorkaround } from 'app/animations';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState, ProjectActions, ProjectNoteActions, ProjectHistoryEntryActions, ProjectTaskActions, ProjectClientActions, ProjectInvoiceActions } from 'app/modules/store';
import { Router, ActivatedRoute } from '@angular/router';
import { InplaceComponent } from 'app/modules/shared/components/inplace/inplace.component';
import { NgForm } from '@angular/forms';
import { NotificationService, BreakpointsService } from 'app/modules/core';
import { ClientActions } from 'app/modules/store/reducers/client/client.actions';
import { ProjectDevisActions } from '../../../../store/reducers/project-devis/project-devis.actions';
import { ReduxSubscriptionComponent } from '../../../../core/components/redux-subscription-component/redux-subscription-component';

@Component({
    selector: 'app-project-dashboard',
    templateUrl: './project-dashboard.component.html',
    styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent extends AbstractProjectComponent implements OnInit, OnDestroy {

    // @HostBinding('@leaveWorkaround') anim = true;

    @ViewChild('projectNameInplace')
    projectNameInplace: InplaceComponent;

    @ViewChild('statusMessageInplace')
    statusMessageInplace: InplaceComponent;

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

    colorScheme = {
        domain: ['#0275d8', '#f0ad4e', '#5cb85c']
    };
    chartSize = [800, 400];
    taskSummary: ChartData[];
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
        private dialog: MatDialog,
        protected _location: Location,
        private _breakpointsService: BreakpointsService
    ) { super(_ngRedux, _location); }

    public ngOnInit() {
        super.ngOnInit();
        this.addSub(this._ngRedux.select(['projectClient', 'items']).subscribe(clients => this.clients = Object.assign([], clients)));
        this.addSub(this._ngRedux.select(['clients', 'items']).subscribe(clients => this.allClients = Object.assign([], clients)));
        this.addSub(this._ngRedux.select(ProjectTaskActions.taskSummary).subscribe((taskSummary: ChartData[]) => this.taskSummary = taskSummary));
        this.addSub(this._ngRedux.select(ProjectDevisActions.devisSummary).subscribe((summary) => this.devisSummary = summary));
        this.addSub(this._ngRedux.select(ProjectInvoiceActions.invoiceSummary).subscribe((summary) => this.invoiceSummary = summary));
        this.addSub(this._breakpointsService.breakpointChanges.subscribe(e => {
            this.updateChartSize(e.newBreakpoint);
        }));
        this.updateChartSize(this._breakpointsService.currentBreakpoint);
    }

    private updateChartSize(breakpoint) {
        if (breakpoint === 'lg' || breakpoint === 'xl') {
            this.chartSize = [800, 400];
        } else if (breakpoint === 'md') {
            this.chartSize = [600, 200];
        } else {
            this.chartSize = [500, 200];
        }
    }

    public saveProjectName(form: NgForm) {
        if (form.valid) {
            this.project.name = form.value.name;
            this._projectAction.dispatchPatch(this.project.id, { 'name': form.value.name });
            this.projectNameInplace.toggle();
        }
    }

    public saveStateMessage(form: NgForm) {
        if (form.valid) {
            this._projectAction.dispatchPatch(this.project.id, { 'stateMessage': form.value.stateMessage });
            this.statusMessageInplace.toggle();
        }
    }

    public changeState(state: ProjectState) {
        const project = ProjectActions.findProject(this._ngRedux.getState(), this.project.id);
        this._projectAction.dispatchPatch(project.id, { 'state': state });
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

    public openClientDialog() {
        this.dialog.open(ClientDialogComponent);
    }

}
