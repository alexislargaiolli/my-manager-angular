import { IMyOptions } from 'mydatepicker';
import { NgForm } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GenericProjectListComponent } from 'app/my-manager/components/common/generic-project-list.component';
import { Gain } from 'app/my-manager/model/gain.model';
import { GainService } from 'app/my-manager/services/gain.service';

@Component({
  selector: 'project-gains',
  templateUrl: './project-gains.component.html',
  styleUrls: ['./project-gains.component.css']
})
export class ProjectGainsComponent extends GenericProjectListComponent<Gain> implements OnInit {

  private today: Date = new Date();

  constructor(protected gainService: GainService) {
    super(gainService);
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

}
