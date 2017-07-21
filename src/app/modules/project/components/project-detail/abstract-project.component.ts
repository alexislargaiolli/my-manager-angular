import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SelectedProjectActions } from './../../../store/reducers/selected-project/selected-project.actions';
import { IAppState } from 'app/modules/store';
import { NgRedux } from '@angular-redux/store';
import { Project } from 'app/models';
import { OnInit } from '@angular/core';
import { ReduxSubscriptionComponent } from 'app/modules/core';
export class AbstractProjectComponent extends ReduxSubscriptionComponent implements OnInit {
    protected project: Project;
    public title: string;

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _location: Location) {
        super();
    }

    ngOnInit(): void {
        this.addSub(this._ngRedux.select(SelectedProjectActions.currentProject).subscribe(p => {
            this.project = Object.assign({}, p);
            this.title = this.project.name;
            this.initProject(this.project);
        }));
    }

    protected initProject(project) {

    }

    protected goBack() {
        this._location.back();
    }
}