import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../model/project.model';
import { ProjectService } from '../../../services/project.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  constructor(private projectService: ProjectService, private router: Router) {

  }

  public ngOnInit() {

  }

  public submitForm(form:NgForm) {
    let newProject = form.value;
    this.projectService.create(newProject).subscribe(project => this.router.navigate(['/project', project.id]));
  }

}
