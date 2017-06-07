import { Component, OnInit, OnDestroy, Inject, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceState, DevisLine, Address, Invoice } from 'app/models';
import { NotificationService, DialogsService } from 'app/modules/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, ProjectInvoiceActions } from 'app/modules/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as moment from 'moment';
import { rightSlideApparitionAnimation, slideApparitionAnimation } from 'app/animations';

@Component({
  selector: 'app-project-invoice-edition',
  templateUrl: './project-invoice-edition.component.html',
  styleUrls: ['./project-invoice-edition.component.scss'],
  animations: [rightSlideApparitionAnimation, slideApparitionAnimation]
})
export class ProjectInvoiceEditionComponent implements OnInit, OnDestroy {

  @ViewChild('invoicePreview') el: ElementRef;

  public invoiceState = InvoiceState;

  public invoice: Invoice;


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: DialogsService,
    private _ngRedux: NgRedux<IAppState>,
    private _invoiceActions: ProjectInvoiceActions,
    private _dragulaService: DragulaService,
    private _elementRef: ElementRef
  ) {
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
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('lines');
  }

  public loadInvoice(invoiceId) {
    if (invoiceId) {
      this._ngRedux.select(['projectInvoices', 'items']).subscribe((invoiceList: Invoice[]) => {
        this.invoice = new Invoice();
        this.invoice = Object.assign(this.invoice, invoiceList.find(invoice => invoice.id === invoiceId));
      });
    } else {
      this.createInvoice();
    }
  }

  public createInvoice() {
    this.invoice = new Invoice();
    this.invoice.createDate = new Date();
    this.invoice.validityDate = moment().add(1, 'month').toDate();
    const profile = this._ngRedux.getState().profile.profile;
    const clients = this._ngRedux.getState().projectClient.items;
    if (profile) {
      if (profile.addresses != null && profile.addresses.length > 0) {
        this.invoice.userAddress = profile.addresses[0];
      }
      this.invoice.userName = `${profile.firstname}  ${profile.lastname}`;
      this.invoice.siret = profile.siret;
      this.invoice.userPhone = profile.phone;
      this.invoice.userMail = profile.email;
    }
    if (clients != null && clients.length > 0 && clients[0].addresses != null && clients[0].addresses.length > 0) {
      this.invoice.clientAddress = clients[0].addresses[0];
    }
    this.invoice.invoiceId = `${moment().format('YY-MM-DD')}-${this._ngRedux.getState().projectInvoices.items.length}`;
  }

  public updateLinePrice(line: DevisLine) {
    DevisLine.updateTotalPrice(line);
    this.invoice.updateTotalPrice();
  }

  public submitForm(form: NgForm) {
    if (form.valid) {
      this._invoiceActions.dispatchSave(this.invoice, this._ngRedux.getState().selectedProject.id);
    }
    // this.goBack();
  }

  public submitLine(form: NgForm) {
    let line = new DevisLine();
    line = Object.assign(line, form.value);
    this.invoice.addLine(line);
  }

  public save() {
    this._invoiceActions.dispatchSave(this.invoice, this._ngRedux.getState().selectedProject.id);
  }

  public onStateChange() {
  }

  public remove() {
    this.dialog.confirm('Supprimé ?', '').subscribe(confirmed => {
      this._invoiceActions.dispatchDelete(this.invoice.id, this._ngRedux.getState().selectedProject.id);
      this.goBack();
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
    const client = this.invoice.clientName ? ' - ' + this.invoice.clientName : '';
    const username = this.invoice.userName ? ' - ' + this.invoice.userName : '';
    const date = this.invoice.createDate ? moment(this.invoice.createDate).format(' - DD-MM-YY') : moment().format(' - DD-MM-YY');
    return `Facture${username}${client}${date}.pdf`;
  }

  goBack(): void {
    this.location.back();
  }
}


