import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, ProjectActions } from 'app/modules/store';
import { Project } from 'app/models';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';


@Injectable()
export class ProjectDetailResolver implements Resolve<Project> {
    constructor(private router: Router, private _ngRedux: NgRedux<IAppState>, private _projectActions: ProjectActions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Project {
        const id = +route.paramMap.get('projectId');
        if (this._ngRedux.getState().projects.selectedId !== id) {
            this._projectActions.dispatchSelectProject(id);
        }

        return this._ngRedux.getState().projects.items.find(p => p.id === id);
    }
}
