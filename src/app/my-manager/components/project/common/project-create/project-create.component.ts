import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'app/my-manager/services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  constructor(private projectService: ProjectService, private router: Router) {

  }

  public ngOnInit() {

  }

  public submitForm(form: NgForm) {
    const newProject = form.value;
    this.projectService.create(newProject).subscribe(project => this.router.navigate(['/project', project.id]));
  }

}
