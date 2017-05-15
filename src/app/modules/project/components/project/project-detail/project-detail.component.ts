import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project, ProjectState } from 'app/models';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  constructor() { }
  public ngOnInit() { }
}
