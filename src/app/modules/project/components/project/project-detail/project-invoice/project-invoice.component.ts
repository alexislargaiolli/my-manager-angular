import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from 'app/animations';

@Component({
  selector: 'app-project-invoice',
  templateUrl: './project-invoice.component.html',
  styleUrls: ['./project-invoice.component.scss'],
  animations: [slideInDownAnimation]
})
export class ProjectInvoiceComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  constructor() { }

  ngOnInit() {
  }

}