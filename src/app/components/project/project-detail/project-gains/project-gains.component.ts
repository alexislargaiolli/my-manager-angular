import { IMyOptions } from 'mydatepicker';
import { DateUtils } from './../../../../utils/date.utils';
import { GenericProjectListComponent } from './../../../common/generic-project-list.component';
import { NgForm } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Gain } from './../../../../model/gain.model';
import { GainService } from '../../../../services/gain.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'project-gains',
  templateUrl: './project-gains.component.html',
  styleUrls: ['./project-gains.component.css']
})
export class ProjectGainsComponent extends GenericProjectListComponent<Gain> implements OnInit {

  public dueDate: Object;
  private today: Date = new Date();

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd.mm.yyyy',
    showClearDateBtn: false
  };

  constructor(protected gainService: GainService, protected route: ActivatedRoute) {
    super(gainService, route);
  }

  public isLate(gain: Gain): boolean {
    if (!gain.dueDate) {
      return false;
    }
    return new Date(gain.dueDate) < this.today;
  }

  public select(gain: Gain) {
    this.selected = gain;
    this.dueDate = DateUtils.jsDateToMyDate(this.selected.dueDate);
  }

  public update(form: NgForm) {
    this.selected.dueDate = DateUtils.myDateToJsDate(form.value.dueDate);
    super.updateSelected();
  }

}
