import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project, ProjectState } from 'app/my-manager/model/project.model';
import { ProjectService } from 'app/my-manager/services/project.service';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  public ProjectState = ProjectState;
  public project: Project;
  public projectId: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  public ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.projectId = +params['projectId'];
      return this.projectService.get(this.projectId);
    })
      .subscribe((project: Project) => {
        this.project = project;
      });
  }

  public onSettingsUpdate(event) {
    this.saveProject();
  }

  public saveProject() {
    this.projectService.update(this.project).subscribe();
  }

}
