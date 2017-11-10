import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Devis } from 'app/models';

@Component({
  selector: 'app-devis-list-item',
  templateUrl: './devis-list-item.component.html',
  styleUrls: ['./devis-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevisListItemComponent implements OnInit {

  @Input()
  devis: Devis;

  @Output()
  delete = new EventEmitter();

  @Output()
  duplicate = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

}
