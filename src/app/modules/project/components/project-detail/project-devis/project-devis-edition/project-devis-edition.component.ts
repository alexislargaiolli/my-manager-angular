import { Component, OnInit, OnDestroy, Inject, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Devis, DevisState, DevisLine, Address } from 'app/models';
import { NotificationService, DialogsService } from 'app/modules/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';
import { ProjectDevisActions } from '../../../../../store/reducers/project-devis/project-devis.actions';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as moment from 'moment';

@Component({
  selector: 'app-project-devis-edition',
  templateUrl: './project-devis-edition.component.html',
  styleUrls: ['./project-devis-edition.component.scss']
})
export class ProjectDevisEditionComponent implements OnInit, OnDestroy {
  @ViewChild('devisPreview') el: ElementRef;
  private devisState = DevisState;
  public devis: Devis;


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: DialogsService,
    private _ngRedux: NgRedux<IAppState>,
    private _devisActions: ProjectDevisActions,
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
    const devisId = +this.route.snapshot.params['devisId'];
    this.loadDevis(devisId);
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('lines');
  }

  public loadDevis(devisId) {
    if (devisId) {
      this._ngRedux.select(['projectDevis', 'items']).subscribe((devisList: Devis[]) => {
        this.devis = new Devis();
        this.devis = Object.assign(this.devis, devisList.find(devis => devis.id === devisId));
      });
    } else {
      this.createDevis();
    }
  }

  public createDevis() {
    this.devis = new Devis();
    this.devis.createDate = new Date();
    this.devis.validityDate = moment().add(1, 'month').toDate();
    const profile = this._ngRedux.getState().profile.profile;
    const clients = this._ngRedux.getState().projectClient.items;
    if (profile) {
      if (profile.addresses != null && profile.addresses.length > 0) {
        this.devis.userAddress = profile.addresses[0];
      }
      this.devis.userName = `${profile.firstname}  ${profile.lastname}`;
      this.devis.siret = profile.siret;
    }
    if (clients != null && clients.length > 0 && clients[0].addresses != null && clients[0].addresses.length > 0) {
      this.devis.clientAddress = clients[0].addresses[0];
    }
    this.devis.devisId = `${moment().format('YY-MM-DD')}-${this._ngRedux.getState().projectDevis.items.length}`;
  }

  public updateLinePrice(line: DevisLine) {
    DevisLine.updateTotalPrice(line);
    this.devis.updateTotalPrice();
  }

  public submitForm(form: NgForm) {
    if (form.valid) {
      this._devisActions.dispatchSave(this.devis, this._ngRedux.getState().selectedProject.id);
    }
    // this.goBack();
  }

  public submitLine(form: NgForm) {
    let line = new DevisLine();
    line = Object.assign(line, form.value);
    this.devis.addLine(line);
  }

  public save() {
    this._devisActions.dispatchSave(this.devis, this._ngRedux.getState().selectedProject.id);
  }

  public onStateChange() {
    if (this.devis.state === DevisState.ACCEPTED && this.devis.acceptedDate == null) {
      this.devis.acceptedDate = new Date();
    }
  }

  public remove() {
    this.dialog.confirm('Supprimé ?', '').subscribe(confirmed => {
      this._devisActions.dispatchDelete(this.devis.id, this._ngRedux.getState().selectedProject.id);
      this.goBack();
    });
  }

  public download() {
    const element = document.querySelector('app-devis-preview');
    html2pdf(element, {
      margin: 0,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    });
  }

  goBack(): void {
    this.location.back();
  }
}


