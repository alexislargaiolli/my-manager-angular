import { DateUtils } from 'app/modules/shared';
import { Project } from 'app/models';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {

  @Input()
  project: Project;

  // 0 nothing, 1 close deadline, 2 deadline exceeded
  deadlineWarningLevel = 0;

  constructor() { }

  ngOnInit() {
    if (this.project.plannedEndDate) {
      const now = new Date();
      const deadline = new Date(this.project.plannedEndDate);
      const dayBeforeDeadline = DateUtils.dayBeweenTwoDate(now, deadline);
      if (dayBeforeDeadline < 0) {
        this.deadlineWarningLevel = 2;
      } else if (dayBeforeDeadline < 7) {
        this.deadlineWarningLevel = 1;
      }
    }
  }

}
