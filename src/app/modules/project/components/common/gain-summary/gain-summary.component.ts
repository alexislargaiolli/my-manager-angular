import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gain-summary',
  templateUrl: './gain-summary.component.html',
  styleUrls: ['./gain-summary.component.scss']
})
export class GainSummaryComponent implements OnInit, OnChanges {

  private static readonly DELTA_MARGIN = -80;

  @Input()
  waitingDevis: number;
  waitingDevisMargin: string;

  @Input()
  acceptedDevis: number;
  acceptedDevisMargin: string;

  @Input()
  waitingInvoices: number;
  waitingInvoicesMargin: string;

  @Input()
  paidInvoices: number;
  paidInvoicesMargin: string;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.waitingDevisMargin = this.computeMargin(this.waitingDevis);
    this.acceptedDevisMargin = this.computeMargin(this.acceptedDevis);
    this.waitingInvoicesMargin = this.computeMargin(this.waitingInvoices);
    this.paidInvoicesMargin = this.computeMargin(this.paidInvoices);
  }

  public computeMargin(value: number): string {
    const sum = this.waitingDevis + this.acceptedDevis + this.waitingInvoices + this.paidInvoices;
    const margin = (value / sum) * GainSummaryComponent.DELTA_MARGIN;
    return `${margin}px`;
  }

}
