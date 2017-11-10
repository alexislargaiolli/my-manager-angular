import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Devis } from 'app/models';
import { listFadeAnim } from 'app/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';

@Component({
  selector: 'app-devis-list',
  templateUrl: './devis-list.component.html',
  styleUrls: ['./devis-list.component.scss'],
  animations: [listFadeAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevisListComponent implements OnInit {

  @Input()
  devisList: Devis[];

  @Input()
  loading: boolean;

  @Output()
  select: EventEmitter<Devis> = new EventEmitter<Devis>();

  @Output()
  delete: EventEmitter<Devis> = new EventEmitter<Devis>();

  @Output()
  duplicate: EventEmitter<Devis> = new EventEmitter<Devis>();

  @Output()
  create: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  selectDevis(devis) {
    this.select.emit(devis);
  }
}
