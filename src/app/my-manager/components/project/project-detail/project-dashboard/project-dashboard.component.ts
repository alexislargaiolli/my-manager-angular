import { Component, OnInit } from '@angular/core';
import { Project } from 'app/my-manager/model/project.model';
import { ProjectService } from 'app/my-manager/services/project.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  public ProjectState = this.ProjectState;
  public project: Project;
  public projectId: number;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  public ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => {
      this.projectId = +params['projectId'];
      return this.projectService.get(this.projectId);
    })
      .subscribe((project: Project) => {
        this.project = project;
      });
  }

  public saveProject() {
    this.projectService.update(this.project).subscribe();
  }

}
