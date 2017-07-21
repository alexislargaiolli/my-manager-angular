import { Location } from '@angular/common';
import { IAppState } from 'app/modules/store';
import { AbstractProjectComponent } from './../abstract-project.component';
import { Component, OnInit, HostBinding } from '@angular/core';
import { centerApparitionAnimation, listFadeAnim, leaveWorkaround } from 'app/animations';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Invoice } from 'app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-invoice',
  templateUrl: './project-invoice.component.html',
  styleUrls: ['./project-invoice.component.scss'],
  animations: [listFadeAnim, leaveWorkaround]
})
export class ProjectInvoiceComponent extends AbstractProjectComponent implements OnInit {

  @HostBinding('@leaveWorkaround') anim = true;

  @select(['projectInvoices', 'items'])
  invoices$: Observable<Invoice[]>;

  @select(['projectInvoices', 'loading'])
  loading$: Observable<boolean>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    protected _ngRedux: NgRedux<IAppState>,
    protected _location: Location
  ) {
    super(_ngRedux, _location);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public select(invoice: Invoice) {
    this._router.navigate([invoice.id], { relativeTo: this._route });
  }

  protected initProject(project) {
    this.title = `${project.name} - Factures`;
  }

}
