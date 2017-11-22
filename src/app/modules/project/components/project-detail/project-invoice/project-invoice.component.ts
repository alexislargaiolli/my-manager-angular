import { Location } from '@angular/common';
import { IAppState, ProjectInvoiceActions } from 'app/modules/store';
import { AbstractProjectComponent } from './../abstract-project.component';
import { Component, OnInit, HostBinding } from '@angular/core';
import { centerApparitionAnimation, listFadeAnim, leaveWorkaround } from 'app/animations';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Invoice } from 'app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from 'app/modules/core';
import { NotificationService } from 'app/modules/core/services/notification.service';

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
    protected _router: Router,
    protected _route: ActivatedRoute,
    protected _ngRedux: NgRedux<IAppState>,
    protected _location: Location,
    private _dialogsService: DialogsService,
    private _invoiceActions: ProjectInvoiceActions,
    private _notificationService: NotificationService
  ) {
    super(_ngRedux, _router, _route);
  }

  ngOnInit() {
    super.ngOnInit();

    this.addSub(this._notificationService.addStoreChangeCreateNotif<Invoice>(['projectInvoices', 'lastCreated'], invoice => `${invoice.title} créée`));
    this.addSub(this._notificationService.addStoreChangeDeleteNotif<Invoice>(['projectInvoices', 'lastDeleted'], invoice => `${invoice.title} supprimée`));
  }

  public select(invoice: Invoice) {
    this._router.navigate([invoice.id], { relativeTo: this._route });
  }

  protected initProject(project) {
    this.title = `${project.name} - Factures`;
  }

  public duplicate(invoice: Invoice) {
    let copy: Invoice = Object.assign(new Invoice(), invoice);
    copy.id = null;
    copy.title += ' (copie)';
    this._invoiceActions.dispatchCreate(copy, copy.projectId);
  }

  public delete(invoice: Invoice) {
    this._dialogsService.confirm('Supprimé ?', '').subscribe(confirmed => {
      if (confirmed) {
        this._invoiceActions.dispatchDelete(invoice, invoice.projectId);
      }
    });
  }

}
