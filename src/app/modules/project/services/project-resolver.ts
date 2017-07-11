import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';
import { Project } from 'app/models';
import { SelectedProjectActions } from '../../store/reducers/selected-project/selected-project.actions';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';


@Injectable()
export class ProjectDetailResolver implements Resolve<Project> {
    constructor(private router: Router, private _ngRedux: NgRedux<IAppState>, private _projectActions: SelectedProjectActions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Project {
        let id = +route.paramMap.get('projectId');
        if (this._ngRedux.getState().selectedProject.id !== id) {
            this._projectActions.dispatchSelectProject(id);
        }

        return this._ngRedux.getState().projects.items.find(p => p.id === id);
    }
}
