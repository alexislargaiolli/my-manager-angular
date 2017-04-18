import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { ProjectService } from 'app/my-manager/services/project.service';
import { Project } from 'app/my-manager/model/project.model';
import { DialogsService } from 'app/core/services/dialog.service';
import { DateUtils } from 'app/shared/utils/date.utils';

@Component({
  selector: 'project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent implements OnInit {

  @Input()
  public project: Project;

  @Output()
  public onUpdate: EventEmitter<Project> = new EventEmitter<Project>();
  public plannedStartDate: Object;
  public startDate: Object;
  public plannedEndDate: Object;
  public endDate: Object;

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
    showClearDateBtn: false
  };

  constructor(private projectService: ProjectService, private router: Router, public dialogsService: DialogsService) { }

  public ngOnInit() { }

  public ngOnChanges() {
    if (this.project) {
      this.plannedStartDate = DateUtils.jsDateToMyDate(this.project.plannedStartDate);
      this.startDate = DateUtils.jsDateToMyDate(this.project.startDate);
      this.plannedEndDate = DateUtils.jsDateToMyDate(this.project.plannedEndDate);
      this.endDate = DateUtils.jsDateToMyDate(this.project.endDate);
    }
  };

  public saveSettings(form: NgForm) {
    this.project.name = form.value.name;
    this.project.description = form.value.description;
    this.project.plannedStartDate = DateUtils.myDateToJsDate(form.value.plannedStartDate);
    this.project.startDate = DateUtils.myDateToJsDate(form.value.startDate);
    this.project.plannedEndDate = DateUtils.myDateToJsDate(form.value.plannedEndDate);
    this.project.endDate = DateUtils.myDateToJsDate(form.value.endDate);
    this.onUpdate.emit(this.project);
  };

  public deleteProject() {
    this.dialogsService.confirmGeneric().subscribe(confirm => {
      if (confirm === true) {
        this.projectService.delete(this.project).subscribe(() => {
          this.project = null;
          this.router.navigate(['/project']);
        });
      }
    });
  }

}
