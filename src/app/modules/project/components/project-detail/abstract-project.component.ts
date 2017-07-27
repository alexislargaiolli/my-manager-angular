import { ProjectActions } from './../../../store/reducers/project/project.actions';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IAppState } from 'app/modules/store';
import { NgRedux } from '@angular-redux/store';
import { Project } from 'app/models';
import { OnInit } from '@angular/core';
import { ReduxSubscriptionComponent } from 'app/modules/core';
export class AbstractProjectComponent extends ReduxSubscriptionComponent implements OnInit {
    public project: Project;
    public title: string;

    constructor(protected _ngRedux: NgRedux<IAppState>, protected _location: Location) {
        super();
    }

    ngOnInit(): void {
        this.addSub(this._ngRedux.select(ProjectActions.currentProject).subscribe(p => {
            this.project = Object.assign(new Project(), p);
            this.title = this.project.name;
            this.initProject(this.project);
        }));
    }

    protected initProject(project) {

    }

    public goBack() {
        this._location.back();
    }
}