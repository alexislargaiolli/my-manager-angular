import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Project } from './../../../../../models/project.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  @Output()
  create: EventEmitter<Project> = new EventEmitter<Project>();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter<any>();

  @select(['projects', 'creating'])
  projectCreating: Observable<boolean>;

  step: number = 0;
  project: Project;

  constructor() { }

  ngOnInit() {
    this.project = new Project();
  }

  nextStep(ngForm: NgForm) {
    if (ngForm.valid) {
      this.step++;
    }
  }

  prevStep() {
    this.step--;
    if (this.step < 0) {
      this.cancel.emit();
    }
  }

  createProject(ngForm: NgForm) {
    if (ngForm.valid) {
      this.create.emit(this.project);
    }
  }

}
