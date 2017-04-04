import { ActivatedRoute } from '@angular/router';
import { GainService } from './../../../services/gain.service';
import { Gain } from './../../../model/gain.model';
import { GenericProjectListComponent } from '../../common/generic-project-list.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gain-list',
  templateUrl: './gain-list.component.html',
  styleUrls: ['./gain-list.component.css']
})
export class GainListComponent extends GenericProjectListComponent<Gain> implements OnInit {

  public totalPotential: number;
  public totalPaid: number;
  public totalInvoiced: number;

  constructor(protected gainService: GainService, protected route: ActivatedRoute) {
    super(gainService, route);
    this.loadAll = true;
  }

  protected onElementLoaded() {
    this.totalPaid = this.elements.reduce((prevVal, current) => {
      return prevVal + (current.paid ? current.budget : 0);
    }, 0);
    this.totalPotential = this.elements.reduce((prevVal, current) => {
      return prevVal + (!current.invoiced && !current.paid ? current.budget : 0);
    }, 0);
    this.totalInvoiced = this.elements.reduce((prevVal, current) => {
      return prevVal + (current.invoiced && !current.paid ? current.budget : 0);
    }, 0);
  }
}
