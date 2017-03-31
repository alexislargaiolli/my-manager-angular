import { ProjectService } from './../../../services/project.service';
import { Component, OnInit, Input } from '@angular/core';
import { Project, ProjectState } from '../../../model/project.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  public ProjectState = ProjectState;
  public project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  public ngOnInit() {
    this.route.params.switchMap((params: Params) => this.projectService.get(+params['projectId']))
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
