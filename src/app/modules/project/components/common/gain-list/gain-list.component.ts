import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-gain-list',
  templateUrl: './gain-list.component.html',
  styleUrls: ['./gain-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GainListComponent implements OnInit {

  @Input()
  public totalPotential = 0;

  @Input()
  public totalPaid = 0;

  @Input()
  public totalInvoiced = 0;

  constructor() { }

  public ngOnInit(): void { }
}
