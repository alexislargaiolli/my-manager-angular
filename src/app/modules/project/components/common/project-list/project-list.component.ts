import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectState } from 'app/models';
import { select, NgRedux } from '@angular-redux/store';
import { listFadeAnim, fadeAnim } from 'app/animations';
import { ReduxSubscriptionComponent } from '../../../../core/components/redux-subscription-component/redux-subscription-component';
import { IAppState } from 'app/modules/store';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [listFadeAnim, fadeAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnChanges {

  public static readonly ITEM_PER_LINE = 4;

  @Input()
  loading: boolean;

  @Output()
  public select: EventEmitter<Project> = new EventEmitter<Project>();

  @Output()
  public create: EventEmitter<Project> = new EventEmitter<Project>();

  _projects: Project[] = [];

  public ProjectState = ProjectState;

  public today: Date = new Date();

  public _animationState = -1;

  public slots = [];

  constructor(private elementRef: ElementRef) {
  }

  public ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const slotCount = ProjectListComponent.ITEM_PER_LINE - (this.projects.length % ProjectListComponent.ITEM_PER_LINE);
    this.slots = Array(slotCount).fill(1);
  }

  public selectProject(p: Project) {
    this.select.emit(p);
  }

  public isLate(p: Project): boolean {
    if (p.plannedEndDate) {
      return new Date(p.plannedEndDate) < this.today;
    }
    return false;
  }

  public animationState() {
    const state = this.projects.length;
    return this._animationState;
  }

  get projects(): Project[] {
    return this._projects;
  }

  @Input()
  set projects(projects: Project[]) {
    this._projects = projects;
    this._animationState = this.projects.length;
  }

}
