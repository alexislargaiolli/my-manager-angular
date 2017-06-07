import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Devis, Invoice } from 'app/models';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss'],
})
export class InvoicePreviewComponent implements OnInit {

  @Input()
  invoice: Invoice;

  constructor() { }

  ngOnInit() {
  }

}
