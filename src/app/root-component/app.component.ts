import { IAppState } from './../modules/store/store.types';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { RepositoriesService, ReduxSubscriptionComponent } from 'app/modules/core';
import { User } from 'app/modules/core/models/user.model';
import { Project, Task, Devis, Note, HistoryEntry, Address, Profile, Invoice } from 'app/models';
import { Client } from 'app/models';
import { SessionActions } from '../modules/auth/redux/session/session.actions';
import { routeAnimation } from './router.animation';
import { Router, NavigationStart } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    animations: [
        routeAnimation
    ]
})
export class AppComponent extends ReduxSubscriptionComponent implements OnInit {

    private redirectAfterLoginUrl: string = '/project';

    constructor(
        private repositoriesService: RepositoriesService,
        private _sessionActions: SessionActions,
        private _router: Router,
        private _ngRedux: NgRedux<IAppState>
    ) {
        super();

    }

    ngOnInit() {
        this.repositoriesService.addManageClass(User.REPO_KEY, 'mmusers');
        this.repositoriesService.addManageClass(Project.REPO_KEY, 'projects');
        this.repositoriesService.addManageClass(Client.REPO_KEY, 'clients');
        this.repositoriesService.addManageClass(Task.REPO_KEY, 'tasks');
        this.repositoriesService.addManageClass(Devis.REPO_KEY, 'devis');
        this.repositoriesService.addManageClass(Note.REPO_KEY, 'notes');
        this.repositoriesService.addManageClass(HistoryEntry.REPO_KEY, 'historyentries');
        this.repositoriesService.addManageClass(Address.REPO_KEY, 'addresses');
        this.repositoriesService.addManageClass(Profile.REPO_KEY, 'profile');
        this.repositoriesService.addManageClass(Invoice.REPO_KEY, 'invoices');
        // this.currentSession.initialize();
        this._sessionActions.dispatchReadFromLocalStorage();
        super.addSub(this._router.events.first().subscribe((e: NavigationStart) => {
            this.redirectAfterLoginUrl = e.url;
        }));

        super.addSub(this._ngRedux.select(['session', 'authenticated']).subscribe(authenticated => {
            if (authenticated) {
                this._router.navigateByUrl(this.redirectAfterLoginUrl);
            }
        }))
    }

    prepRouteState(outlet: any) {
        return outlet.activatedRouteData['animation'] || 'firstPage';
    }

}
