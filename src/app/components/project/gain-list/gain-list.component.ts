import { ActivatedRoute } from '@angular/router';
import { GainService } from './../../../services/gain.service';
import { Gain } from './../../../model/gain.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gain-list',
  templateUrl: './gain-list.component.html',
  styleUrls: ['./gain-list.component.css']
})
export class GainListComponent implements OnInit {

  public totalPotential = 0;
  public totalPaid = 0;
  public totalInvoiced = 0;

  constructor(protected gainService: GainService, protected route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.onElementLoaded();
  }

  protected onElementLoaded() {
    this.gainService.getTotals().subscribe(totals => {
      this.totalPaid = totals['total'];
      this.totalInvoiced = totals['invoiced'];
      this.totalPotential = totals['potential'];
    });

    // this.totalPaid = this.elements.reduce((prevVal, current) => {
    //   return prevVal + (current.paid ? current.budget : 0);
    // }, 0);
    // this.totalPotential = this.elements.reduce((prevVal, current) => {
    //   return prevVal + (!current.invoiced && !current.paid ? current.budget : 0);
    // }, 0);
    // this.totalInvoiced = this.elements.reduce((prevVal, current) => {
    //   return prevVal + (current.invoiced && !current.paid ? current.budget : 0);
    // }, 0);
  }
}
