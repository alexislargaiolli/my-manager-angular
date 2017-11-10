import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Devis } from 'app/models';

@Component({
  selector: 'app-devis-list-item',
  templateUrl: './devis-list-item.component.html',
  styleUrls: ['./devis-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevisListItemComponent implements OnInit {

  @Input()
  devis: Devis;

  constructor() {

  }

  ngOnInit() {
  }

}
