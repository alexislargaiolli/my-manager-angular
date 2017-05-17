import { Injectable } from '@angular/core';
import { RepositoriesService } from 'app/modules/core';
import { Project } from 'app/models';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store.types';
import { ModelActions } from '../model/model.actions';
import { ProjectState } from 'app/models';

@Injectable()
export class ProjectActions extends ModelActions<Project> {

    constructor(protected _repo: RepositoriesService) {
        super(_repo, Project.name);
    }

}

// @Injectable()
// export class ProjectActions extends ModelActions<Project>{

//     public static readonly PROJECT_CHANGE_STATE = 'PROJECT_CHANGE_STATE';

//     constructor(protected repo: RepositoriesService, protected _ngRedux: NgRedux<IAppState>) {
//         super(repo, _ngRedux, Project.name)
//     }

//     changeState(id: number, state: ProjectState) {
//         this._ngRedux.dispatch({
//             type: ProjectActions.PROJECT_CHANGE_STATE,
//             payload: {
//                 id,
//                 state
//             }
//         })
//     }

// }
