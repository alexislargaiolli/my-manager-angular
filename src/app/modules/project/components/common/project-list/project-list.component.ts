import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectState } from 'app/models';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public ProjectState = ProjectState;
  public projects: Project[];
  public today: Date = new Date();
  public loading = false;

  constructor(private projectService: ProjectService) { }

  public ngOnInit() {
    this.loadProject();
  }

  public loadProject() {
    this.loading = true;
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
      this.loading = false;
    });
  }

  public isLate(p: Project): boolean {
    if (p.plannedEndDate) {
      return new Date(p.plannedEndDate) < this.today;
    }
    return false;
  }

  public sortProjects() {
    this.projects.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      } else if (a.name < b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
