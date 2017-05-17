import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { RepositoriesService, CurrentSession } from 'app/modules/core';
import { Project, ProjectState } from 'app/models';
import { User } from 'app/modules/core/models/user.model';
import { Client } from 'app/models';
import { Address } from 'app/models';
import { IAppState } from '../../../store/store.types';
import { ProjectActions } from '../../../store/reducers/project/project.actions';

@Component({
  selector: 'project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.css']
})
export class ProjectHomeComponent implements OnInit {

  @select(['projects', 'items'])
  projects$;

  ProjectState = ProjectState;

  constructor(
    private repositoriesService: RepositoriesService,
    private currentSession: CurrentSession,
    private projectActions: ProjectActions,
    private _ngRedux: NgRedux<IAppState>
  ) {

  }

  public ngOnInit() {
    this._ngRedux.dispatch(this.projectActions.load());
  }

  public createProject() {
    this._ngRedux.dispatch(this.projectActions.create({ name: 'test redux' }));
  }

  public delete(project) {
    this._ngRedux.dispatch(this.projectActions.delete(project.id))
  }

  public test() {
    const userId = this.currentSession.userId;
    const token = this.currentSession.token;
    // this.repositoriesService.get(Project.name, 1).by(User.name, userId).auth(token).exec().subscribe(projects => {
    //   console.table(projects);
    // });

    // this.repositoriesService.get(User.name, userId).auth(token).exec().subscribe(user => {
    //   console.log(user);
    // });

    this.repositoriesService.get(Address.name, null).by(Client.name, 4).exec().subscribe(client => {
      console.table(client);
    });
  }

}
