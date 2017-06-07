import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project, ProjectState } from 'app/models';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { SelectedProjectActions } from 'app/modules/store';
import { slideInDownAnimation, apparitionAnimation } from 'app/animations';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  animations: [slideInDownAnimation, apparitionAnimation]
})
export class ProjectDetailComponent implements OnInit {

  @select(SelectedProjectActions.currentProject)
  currentProject$: Observable<Project>;

  constructor(private _selectedProjectAction: SelectedProjectActions, private activatedRoute: ActivatedRoute) {
    this._selectedProjectAction.dispatchSelectProject(activatedRoute.snapshot.params['projectId']);
  }
  public ngOnInit() { }
}
