import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectState } from 'app/models';
import { select, NgRedux } from '@angular-redux/store';
import { listFadeAnim, fadeAnim } from 'app/animations';
import { ReduxSubscriptionComponent } from '../../../../core/components/redux-subscription-component/redux-subscription-component';
import { IAppState } from 'app/modules/store';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @Input('loading')
  loading = true;

  @Output()
  public select: EventEmitter<Project> = new EventEmitter<Project>();

  @Output()
  public create: EventEmitter<Project> = new EventEmitter<Project>();

  originalProjectList: Project[] = null;

  projectStates = ProjectState;

  _projects: Project[] = [];

  _animationState = -1;

  slots = [1, 1, 1, 1];

  sortField: string;
  sortOrder = 1;
  filterState: ProjectState;

  constructor(private elementRef: ElementRef) {
  }

  public ngOnInit() {

  }

  public selectProject(p: Project) {
    this.select.emit(p);
  }

  public sort(event) {
    const field = event.value;
    this.sortOrder = field === this.sortField ? this.sortOrder * -1 : 1;
    this.sortField = field;

    if (this.sortField === 'name') {
      this.projects = this.projects.sort((p1, p2) => {
        return p1.name.localeCompare(p2.name) * this.sortOrder;
      });
    } else if (this.sortField === 'state') {
      this.projects = this.projects.sort((p1, p2) => {
        return p1.state.toString().localeCompare(p2.state.toString()) * this.sortOrder;
      });
    } else if (this.sortField === 'deadline') {
      this.projects = this.projects.sort((p1, p2) => {
        if (!p1.plannedEndDate && !p2.plannedEndDate) {
          return 0;
        }
        if (!p2.plannedEndDate) {
          return -1;
        }
        if (!p1.plannedEndDate) {
          return 1;
        }
        return (new Date(p1.plannedEndDate).getTime() - new Date(p2.plannedEndDate).getTime()) * this.sortOrder;
      });
    }
  }

  public filter() {
    if (this.originalProjectList === null) {
      this.originalProjectList = this._projects;
    }
    this._projects = this.originalProjectList.filter(p => {
      let keep = true;
      if (this.filterState !== null && p.state !== this.filterState) {
        keep = false;
      }
      return keep;
    });
  }

  public animationState() {
    const state = this.projects.length;
    return this._animationState;
  }

  get projects(): Project[] {
    return this._projects;
  }

  @Input('projects')
  set projects(projects: Project[]) {
    this._projects = projects;
    this._animationState = this.projects.length;
  }

}
