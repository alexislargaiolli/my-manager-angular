import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { NgRedux } from '@angular-redux/store';
import { IAppState, DashboardActions } from '../../../../store';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gain-summary',
  templateUrl: './gain-summary.component.html',
  styleUrls: ['./gain-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailAnim', [
      state('SHOWN', style({ opacity: 1 })),
      state('HIDDEN', style({ opacity: 0, display: 'none' })),
      transition('SHOWN => HIDDEN', animate('200ms ease')),
      transition('HIDDEN => SHOWN', animate('200ms ease')),
    ])
  ]
})
export class GainSummaryComponent implements OnInit, OnChanges {

  @Input()
  waitingDevis: number;

  @Input()
  acceptedDevis: number;

  @Input()
  waitingInvoices: number;

  @Input()
  paidInvoices: number;

  @Input()
  fromDate: Date;

  @Input()
  toDate: Date;

  totalWaiting: number;

  detailState = 'HIDDEN';

  constructor(private _dashboardActions: DashboardActions, private _redux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.totalWaiting = this.waitingDevis + this.acceptedDevis + this.waitingInvoices;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.acceptedDevis || changes.waitingDevis || changes.waitingDevis) {
      this.totalWaiting = this.waitingDevis + this.acceptedDevis + this.waitingInvoices;
    }
  }

  showDetail() {
    if (this.totalWaiting > 0 || this.paidInvoices > 0) {
      this.detailState = 'SHOWN';
    }
  }

  hideDetail() {
    this.detailState = 'HIDDEN';
  }

  changeDate(form: NgForm) {
    if (form.valid) {
      this._redux.dispatch(this._dashboardActions.loadTotal(form.value.fromDate, form.value.toDate));
    }
  }
}
