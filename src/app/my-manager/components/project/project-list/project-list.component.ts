import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, ProjectState } from 'app/my-manager/model/project.model';
import { ProjectService } from 'app/my-manager/services/project.service';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public ProjectState = ProjectState;
  public projects: Project[];
  public today: Date = new Date();

  constructor(private projectService: ProjectService) { }

  public ngOnInit() {
    this.projectService.getAll().subscribe(projects => {
      this.projects = projects;
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
