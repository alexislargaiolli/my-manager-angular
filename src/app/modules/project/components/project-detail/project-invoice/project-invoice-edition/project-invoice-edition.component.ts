import { Component, OnInit, OnDestroy, Inject, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceState, DevisLine, Address, Invoice, Devis } from 'app/models';
import { NotificationService, DialogsService, ReduxSubscriptionComponent } from 'app/modules/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, ProjectInvoiceActions, ProjectHistoryEntryActions } from 'app/modules/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as moment from 'moment';
import { rightSlideApparitionAnimation, slideApparitionAnimation } from 'app/animations';
import { MatDialog } from '@angular/material';
import { SelectDevisComponent } from './select-devis/select-devis.component';
import { HistoryEntryFactory } from 'app/models/historyentry.factory';
import { NavigationService } from 'app/modules/project/services/navigation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-invoice-edition',
  templateUrl: './project-invoice-edition.component.html',
  styleUrls: ['./project-invoice-edition.component.scss'],
  animations: [rightSlideApparitionAnimation, slideApparitionAnimation]
})
export class ProjectInvoiceEditionComponent extends ReduxSubscriptionComponent implements OnInit, OnDestroy {

  @ViewChild('invoicePreview') el: ElementRef;

  public invoiceState = InvoiceState;

  public invoice: Invoice;
  public stateHasChanged = false;


  constructor(
    private location: Location,
    private _router: Router,
    private route: ActivatedRoute,
    private dialog: DialogsService,
    private _ngRedux: NgRedux<IAppState>,
    private _invoiceActions: ProjectInvoiceActions,
    private _dragulaService: DragulaService,
    private _historyActions: ProjectHistoryEntryActions,
    private _notificationService: NotificationService,
    private _elementRef: ElementRef,
    public _MatDialog: MatDialog
  ) {
    super();
    _dragulaService.setOptions('lines', {
      removeOnSpill: true,
      moves: function (el, container, handle) {
        return handle.className.indexOf('devis-line-drag-handle') !== -1;
      }
    });
  }

  ngOnInit() {
    const invoiceId = +this.route.snapshot.params['invoiceId'];
    this.loadInvoice(invoiceId);
    this.addSub(this._notificationService.addStoreChangeSaveNotif<Devis>(['projectInvoices', 'lastUpdated'], devis => `${devis.title} sauvegardé`));
    this.addSub(this._notificationService.addStoreChangeCreateNotif<Devis>(['projectInvoices', 'lastCreated'], devis => `${devis.title} sauvegardé`));
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('lines');
    super.ngOnDestroy();
  }

  public loadInvoice(invoiceId) {
    if (invoiceId) {
      this.addSub(this._ngRedux.select<Invoice[]>(['projectInvoices', 'items']).subscribe(invoiceList => {
        if (!this._ngRedux.getState().projectInvoices.loading) {
          const storeInvoice = invoiceList.find(invoice => invoice.id === invoiceId);
          if (storeInvoice) {
            this.invoice = Object.assign(new Invoice(), storeInvoice);
          } else {
            this._notificationService.addError('Facture introuvable');
            this._router.navigate(['../'], { relativeTo: this.route });
          }
        }
      }));
    } else {
      this.createInvoice();
      this.addSub(this._ngRedux.select<Invoice>(['projectInvoices', 'lastCreated']).subscribe(invoice => {
        if (invoice) {
          this.invoice.id = invoice.id;
        }
      }));
    }
  }

  public createInvoice() {
    this.invoice = new Invoice();
    const profile = this._ngRedux.getState().profile.profile;
    const clients = this._ngRedux.getState().projectClient.items;
    if (profile) {
      this.invoice.importProfile(profile);
    }
    if (clients != null && clients.length > 0) {
      this.invoice.importClient(clients[0]);
    }
    this.invoice.invoiceId = `${moment().format('YY-MM-DD')}-${this._ngRedux.getState().projectInvoices.items.length}`;
  }

  public updateLinePrice(line: DevisLine) {
    DevisLine.updateTotalPrice(line);
    this.invoice.updateTotalPrice();
  }

  public submitForm(form: NgForm) {
    if (form.valid) {
      this.save();
    }
    // this.goBack();
  }

  public submitLine(form: NgForm) {
    let line = new DevisLine();
    line = Object.assign(line, form.value);
    this.invoice.addLine(line);
  }

  public save() {
    this._invoiceActions.dispatchSave(this.invoice, this._ngRedux.getState().projects.selectedId);
  }

  public onStateChange() {
    if (this.invoice.state === InvoiceState.PAID && this.invoice.paidDate == null) {
      this.invoice.paidDate = new Date();
    }
    this.stateHasChanged = true;
  }

  public importDevis() {
    let dialogRef = this._MatDialog.open(SelectDevisComponent);
    dialogRef.afterClosed().subscribe((devis: Devis) => {
      if (devis) {
        this.invoice.importDevis(devis);
      }
    });
  }

  public remove() {
    this.dialog.confirm('Supprimé ?', '').subscribe(confirmed => {
      if (confirmed) {
        this._invoiceActions.dispatchDelete(this.invoice, this.invoice.projectId);
        this.goBack();
      }
    });
  }

  public download() {
    const element = document.querySelector('app-invoice-preview');
    html2pdf(element, {
      margin: 0,
      filename: this.generateFileName(),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    });
  }

  private generateFileName() {
    return this.invoice.generateFileName();
  }

  goBack(): void {
    this._router.navigate(['../'], { relativeTo: this.route });
  }
}


