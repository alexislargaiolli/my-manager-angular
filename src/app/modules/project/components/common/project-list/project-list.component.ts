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
  public selectionStarts: EventEmitter<Project> = new EventEmitter<Project>();

  @Output()
  public selectionEnds: EventEmitter<Project> = new EventEmitter<Project>();

  @Output()
  public create: EventEmitter<Project> = new EventEmitter<Project>();

  private _selectedProject: Project = null;
  public ProjectState = ProjectState;
  public today: Date = new Date();

  constructor() { }

  public ngOnInit() { }

  public selectProject(p: Project) {
    this._selectedProject = p;
    this.selectionStarts.emit(this._selectedProject);
  }

  public animationDone() {
    this.selectionEnds.emit(this._selectedProject);
  }

  public isLate(p: Project): boolean {
    if (p.plannedEndDate) {
      return new Date(p.plannedEndDate) < this.today;
    }
    return false;
  }

  public isSelected(p: Project): boolean {
    if (this._selectedProject === null) {
      return null;
    }
    return p.id === this._selectedProject.id;
  }

  public hasSelected() {
    return this._selectedProject != null;
  }
}
