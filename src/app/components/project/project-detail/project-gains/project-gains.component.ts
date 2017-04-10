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

  private today: Date = new Date();

  constructor(protected gainService: GainService, protected route: ActivatedRoute) {
    super(gainService, route);
  }

  public select(elt: Gain) {
    if (!this.selected) {
      this.selected = elt;
      if (elt.dueDate) {
        this.selected.dueDate = new Date(elt.dueDate);
      }
    }
  }

  public isLate(gain: Gain): boolean {
    if (!gain.dueDate) {
      return false;
    }
    return new Date(gain.dueDate) < this.today;
  }

  public updateSelected(attributes:Object){
    if(this.selected.dueDate){
      attributes['dueDate'] = this.selected.dueDate;
    }
    super.updateSelected(attributes);
  }

}
