import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
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
export class ProjectListComponent implements OnInit {

  @Input()
  projects: Project[];

  @Input()
  loading: boolean;

  @Output()
  public select: EventEmitter<Project> = new EventEmitter<Project>();

  @Output()
  public create: EventEmitter<Project> = new EventEmitter<Project>();

  public ProjectState = ProjectState;
  public today: Date = new Date();

  constructor() { }

  public ngOnInit() {
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
}
