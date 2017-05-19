import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectState } from 'app/models';
import { select } from '@angular-redux/store';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @Input('projects')
  projects$: Observable<Project>;

  @Input('loading')
  loading$: Observable<boolean>;

  @Output()
  public select: EventEmitter<Project> = new EventEmitter<Project>();

  public ProjectState = ProjectState;
  public today: Date = new Date();

  constructor() { }

  public ngOnInit() { }

  public isLate(p: Project): boolean {
    if (p.plannedEndDate) {
      return new Date(p.plannedEndDate) < this.today;
    }
    return false;
  }
}
