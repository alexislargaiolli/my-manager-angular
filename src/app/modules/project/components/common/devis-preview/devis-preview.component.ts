import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Devis } from 'app/models';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-devis-preview',
  templateUrl: './devis-preview.component.html',
  styleUrls: ['./devis-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevisPreviewComponent implements OnInit {

  @Input('devis')
  devis$: Observable<Devis>;

  @Input('loading')
  loading$: Observable<boolean>;

  @Output()
  selectDevis: EventEmitter<Devis> = new EventEmitter<Devis>();

  constructor() { }

  ngOnInit() { }

}
