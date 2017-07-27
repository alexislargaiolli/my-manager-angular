import { ProjectActions } from 'app/modules/store';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project, ProjectState } from 'app/models';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { slideInDownAnimation, apparitionAnimation } from 'app/animations';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  animations: [slideInDownAnimation, apparitionAnimation]
})
export class ProjectDetailComponent implements OnInit {

  @select(ProjectActions.currentProject)
  currentProject$: Observable<Project>;

  constructor(private _projectAction: ProjectActions, private activatedRoute: ActivatedRoute) {
    this._projectAction.dispatchSelectProject(activatedRoute.snapshot.params['projectId']);
  }
  public ngOnInit() { }
}
