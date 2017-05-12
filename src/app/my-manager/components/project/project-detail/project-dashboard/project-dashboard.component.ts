import { Component, OnInit, HostBinding } from '@angular/core';
import { Project } from 'app/my-manager/model/project.model';
import { TaskState } from 'app/my-manager/model/task.model';
import { ProjectService } from 'app/my-manager/services/project.service';
import { ActivatedRoute, Params } from '@angular/router';
import { slideInDownAnimation } from 'app/animations';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss'],
  animations: [slideInDownAnimation]
})
export class ProjectDashboardComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  public ProjectState = this.ProjectState;
  public TaskState = this.TaskState;
  public project: Project;
  public projectId: number;
  public taskCountByState = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  public ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => {
      this.projectId = +params['projectId'];
      return this.projectService.get(this.projectId);
    })
      .subscribe((project: Project) => {
        this.project = project;
        this.projectService.getTaskCount(this.projectId).subscribe(res => {
          this.taskCountByState = res;
        });
      });
  }

  public saveProject() {
    this.projectService.update(this.project).subscribe();
  }

}
