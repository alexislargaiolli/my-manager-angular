import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Devis } from 'app/models';

@Component({
  selector: 'app-devis-preview',
  templateUrl: './devis-preview.component.html',
  styleUrls: ['./devis-preview.component.scss'],
})
export class DevisPreviewComponent implements OnInit {

  @Input()
  devis: Devis;

  constructor() { }

  ngOnInit() {
  }

}
