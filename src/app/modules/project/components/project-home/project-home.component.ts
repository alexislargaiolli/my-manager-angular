import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { RepositoriesService, CurrentSession } from 'app/modules/core';
import { Project, ProjectState } from 'app/models';
import { User } from 'app/modules/core/models/user.model';
import { Client } from 'app/models';
import { Address } from 'app/models';
import { IAppState } from '../../../store/store.types';
import { ProjectActions } from '../../../store/reducers/project/project.actions';
import { Observable } from 'rxjs/Rx';
import { SelectedProjectActions } from 'app/modules/store';

@Component({
  selector: 'project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css']
})
export class ProjectHomeComponent implements OnInit {

  @select(['projects', 'items'])
  projects$: Observable<Project[]>;

  @select(['projects', 'boolean'])
  loading$: Observable<boolean>;

  ProjectState = ProjectState;

  constructor(
    private _projectActions: ProjectActions,
    private _selectedProjectAction: SelectedProjectActions,
    private _ngRedux: NgRedux<IAppState>
  ) {

  }

  public ngOnInit() {
    this._ngRedux.dispatch(this._projectActions.load());
  }

  public createProject(project) {
    this._ngRedux.dispatch(this._projectActions.create(project));
  }

  public delete(project) {
    this._ngRedux.dispatch(this._projectActions.delete(project.id))
  }

  public onSelect(project) {
    this._ngRedux.dispatch(this._selectedProjectAction.selectProject(project));
  }

}
