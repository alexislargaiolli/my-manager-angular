import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Project, ProjectState } from 'app/models';
import { ProjectService } from 'app/my-manager/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  constructor() { }
  public ngOnInit() { }
  public rlaSafe: boolean = false;

  public ngAfterViewInit() {
    this.rlaSafe = true;
  }
}
