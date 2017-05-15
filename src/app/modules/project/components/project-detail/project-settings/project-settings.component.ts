import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { DialogsService, NotificationService } from 'app/modules/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from 'app/models';
import { DateUtils } from 'app/modules/shared';
import { slideInDownAnimation } from 'app/animations';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss'],
  animations: [slideInDownAnimation]
})
export class ProjectSettingsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  public projectId: number;
  public project: Project;
  public plannedStartDate: Object;
  public startDate: Object;
  public plannedEndDate: Object;
  public endDate: Object;

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
    showClearDateBtn: false
  };

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogsService: DialogsService,
    private notificationService: NotificationService) { }

  public ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.projectService.get(this.projectId).subscribe(p => {
        this.project = p;
        this.plannedStartDate = DateUtils.jsDateToMyDate(this.project.plannedStartDate);
        this.startDate = DateUtils.jsDateToMyDate(this.project.startDate);
        this.plannedEndDate = DateUtils.jsDateToMyDate(this.project.plannedEndDate);
        this.endDate = DateUtils.jsDateToMyDate(this.project.endDate);
      });
    });
  }

  public saveSettings(form: NgForm) {
    this.project.name = form.value.name;
    this.project.description = form.value.description;
    this.project.plannedStartDate = DateUtils.myDateToJsDate(form.value.plannedStartDate);
    this.project.startDate = DateUtils.myDateToJsDate(form.value.startDate);
    this.project.plannedEndDate = DateUtils.myDateToJsDate(form.value.plannedEndDate);
    this.project.endDate = DateUtils.myDateToJsDate(form.value.endDate);
    this.projectService.update(this.project).subscribe(p => {
      this.notificationService.addInfo('Sauvegarde réussie');
    });
    // this.onUpdate.emit(this.project);
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
