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
import { rightSlideApparitionAnimation, slideApparitionAnimation } from 'app/animations';
import { ReduxSubscriptionComponent } from '../../../../../core/components/redux-subscription-component/redux-subscription-component';
import { ProjectHistoryEntryActions } from '../../../../../store/reducers/project-history/project-history.actions';
import { HistoryEntryFactory } from '../../../../../../models/historyentry.factory';

@Component({
  selector: 'app-project-devis-edition',
  templateUrl: './project-devis-edition.component.html',
  styleUrls: ['./project-devis-edition.component.scss'],
  animations: [rightSlideApparitionAnimation, slideApparitionAnimation]
})
export class ProjectDevisEditionComponent extends ReduxSubscriptionComponent implements OnInit, OnDestroy {
  @ViewChild('devisPreview') el: ElementRef;
  public devisState = DevisState;
  public devis: Devis;
  public stateHasChanged = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: DialogsService,
    private _ngRedux: NgRedux<IAppState>,
    private _devisActions: ProjectDevisActions,
    private _historyActions: ProjectHistoryEntryActions,
    private _dragulaService: DragulaService,
    private _notificationService: NotificationService
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
    const devisId = +this.route.snapshot.params['devisId'];
    this.devis = null;
    this.loadDevis(devisId);
    this.addSub(this._notificationService.addStoreChangeSaveNotif<Devis>(['projectDevis', 'lastUpdated'], devis => `${devis.title} sauvegardé`));
  }

  ngOnDestroy(): void {
    this._dragulaService.destroy('lines');
    super.ngOnDestroy();
  }

  public loadDevis(devisId) {
    if (devisId) {
      this.addSub(
        this._ngRedux.select(['projectDevis', 'items']).subscribe((devisList: Devis[]) => {
          const storeDevis = devisList.find(devis => devis.id === devisId);
          if (storeDevis) {
            if (this.devis && this.stateHasChanged) {
              this._historyActions.dispatchCreate(HistoryEntryFactory.devisStateUpdated(this.devis), this.devis.projectId);
            }
            this.devis = new Devis();
            this.devis = Object.assign(this.devis, storeDevis);
            this.stateHasChanged = false;
          }
        })
      );
    } else {
      this.createDevis();
    }
  }

  public createDevis() {
    this.devis = new Devis();
    const profile = this._ngRedux.getState().profile.profile;
    const clients = this._ngRedux.getState().projectClient.items;
    if (profile) {
      this.devis.importProfile(profile);
    }
    if (clients != null && clients.length > 0) {
      this.devis.importClient(clients[0]);
    }
    this.devis.devisId = `${moment().format('YY-MM-DD')}-${this._ngRedux.getState().projectDevis.items.length}`;
  }

  public updateLinePrice(line: DevisLine) {
    DevisLine.updateTotalPrice(line);
    this.devis.updateTotalPrice();
  }

  public submitForm(form: NgForm) {
    if (form.valid) {
      this.save();
    }
  }

  public submitLine(form: NgForm) {
    let line = new DevisLine();
    line = Object.assign(line, form.value);
    this.devis.addLine(line);
  }

  public save() {
    this._devisActions.dispatchSave(this.devis, this._ngRedux.getState().projects.selectedId);
  }

  public onStateChange() {
    if (this.devis.state === DevisState.ACCEPTED && this.devis.acceptedDate == null) {
      this.devis.acceptedDate = new Date();
    }
    this.stateHasChanged = true;
  }

  public remove() {
    this.dialog.confirm('Supprimé ?', '').subscribe(confirmed => {
      if (confirmed) {
        this._devisActions.dispatchDelete(this.devis, this._ngRedux.getState().projects.selectedId);
        this.goBack();
      }
    });
  }

  public download() {
    const element = document.querySelector('app-devis-preview');
    html2pdf(element, {
      margin: 0,
      filename: this.generateFileName(),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    });
  }

  private generateFileName() {
    return this.devis.generateFileName();
  }

  goBack(): void {
    this.location.back();
  }
}


