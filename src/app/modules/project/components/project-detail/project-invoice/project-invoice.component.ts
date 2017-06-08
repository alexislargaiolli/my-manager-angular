import { Component, OnInit, HostBinding } from '@angular/core';
import { centerApparitionAnimation } from 'app/animations';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Invoice } from 'app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-invoice',
  templateUrl: './project-invoice.component.html',
  styleUrls: ['./project-invoice.component.scss'],
  animations: [centerApparitionAnimation]
})
export class ProjectInvoiceComponent implements OnInit {

  @select(['projectInvoices', 'items'])
  invoices$: Observable<Invoice[]>;

  @select(['projectInvoices', 'loading'])
  loading$: Observable<boolean>;

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  public select(invoice: Invoice) {
    this._router.navigate([invoice.id], { relativeTo: this._route });
  }

}
