import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Devis, DevisState } from 'app/models';
import { NotificationService, DialogsService } from 'app/modules/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';
import { ProjectDevisActions } from '../../../../../store/reducers/project-devis/project-devis.actions';

@Component({
  selector: 'app-project-devis-edition',
  templateUrl: './project-devis-edition.component.html',
  styleUrls: ['./project-devis-edition.component.scss']
})
export class ProjectDevisEditionComponent implements OnInit {
  private devisState = DevisState;
  public devis: Devis;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: DialogsService,
    private _ngRedux: NgRedux<IAppState>,
    private _devisActions: ProjectDevisActions
  ) { }

  ngOnInit() {
    const devisId = +this.route.snapshot.params['devisId'];
    this.loadDevis(devisId);
  }

  public loadDevis(devisId) {
    if (devisId === 'create') {
      this.createDevis();
    } else {
      this._ngRedux.select(['projectDevis', 'items']).subscribe((devisList: Devis[]) => {
        this.devis = Object.assign({}, devisList.find(devis => devis.id === devisId));
        if (this.devis.createDate)
          this.devis.createDate = new Date(this.devis.createDate);
        if (this.devis.acceptedDate)
          this.devis.acceptedDate = new Date(this.devis.acceptedDate);
      });
    }
  }

  public createDevis() {
    this.devis = new Devis();
    this.devis.createDate = new Date();
    this.devis.devisId = '1';
  }

  public submitForm(form: NgForm) {
    // this._devisActions.dispatchSave(this.devis, this._ngRedux.getState().selectedProject.id);
    // this.goBack();
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

  goBack(): void {
    this.location.back();
  }
}
