import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-gain-list',
  templateUrl: './gain-list.component.html',
  styleUrls: ['./gain-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GainListComponent implements OnInit {

  @Input()
  public totalPotential: Observable<number>;

  @Input()
  public totalPaid: Observable<number>;

  @Input()
  public totalInvoiced: Observable<number>;

  constructor() { }

  public ngOnInit(): void { }
}
