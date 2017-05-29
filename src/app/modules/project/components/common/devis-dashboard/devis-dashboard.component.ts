import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Devis } from 'app/models';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-devis-dashboard',
  templateUrl: './devis-dashboard.component.html',
  styleUrls: ['./devis-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevisDashboardComponent implements OnInit {

  @Input('devis')
  devis$: Observable<Devis>;

  @Input('loading')
  loading$: Observable<boolean>;

  @Output()
  selectDevis: EventEmitter<Devis> = new EventEmitter<Devis>();

  constructor() { }

  ngOnInit() { }

}
