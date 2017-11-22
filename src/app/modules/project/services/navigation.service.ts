import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Devis } from 'app/models';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { IAppState } from 'app/modules/store/store.types';

@Injectable()
export class NavigationService {

    constructor(protected router: Router, private _ngRedux: NgRedux<IAppState>) { }

    public goToHome() {
        this.router.navigate(['home']);
    }

    public goProjectDashboard() {
        this.router.navigate(['project']);
    }

    public goToProjectHome() {
        const projectId = this._ngRedux.getState().projects.selectedId;
        this.router.navigate(['project', { projectId }]);
    }

    public goToProjectDevisList() {
        const projectId = this._ngRedux.getState().projects.selectedId;
        this.router.navigate(['devis', { projectId }]);
    }

    public goToProjectInvoiceList() {
        const projectId = this._ngRedux.getState().projects.selectedId;
        this.router.navigate(['invoices', { projectId }]);
    }

    public goToDevis(devis: Devis) {
        this.router.navigate(['devis', { id: devis.id }]);
    }

    public goToLogin() {
        this.router.navigate(['login']);
    }

}