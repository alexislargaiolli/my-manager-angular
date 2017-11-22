import { ProjectDevisActions } from './../../../../store/reducers/project-devis/project-devis.actions';
import { Location } from '@angular/common';
import { IAppState } from 'app/modules/store';
import { AbstractProjectComponent } from './../abstract-project.component';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Devis } from 'app/models';
import { NavigationService } from '../../../services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { centerApparitionAnimation, leaveWorkaround } from 'app/animations';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';
import * as moment from 'moment';
import { DialogsService } from 'app/modules/core';
import { NotificationService } from 'app/modules/core/services/notification.service';

@Component({
  selector: 'app-project-devis',
  templateUrl: './project-devis.component.html',
  styleUrls: ['./project-devis.component.scss'],
  animations: [centerApparitionAnimation, leaveWorkaround]
})
export class ProjectDevisComponent extends AbstractProjectComponent implements OnInit {

  @HostBinding('@leaveWorkaround') anim = true;

  @select(['projectDevis', 'items'])
  devis$: Observable<Devis[]>;

  @select(['projectDevis', 'loading'])
  loading$: Observable<boolean>;

  creation = false;

  constructor(
    protected _route: ActivatedRoute,
    protected _router: Router,
    protected _ngRedux: NgRedux<IAppState>,
    private _notificationService: NotificationService,
    private _devisActions: ProjectDevisActions,
    private dialog: DialogsService,
  ) {
    super(_ngRedux, _router, _route);
  }

  ngOnInit() {
    super.ngOnInit();
    this.addSub(this._notificationService.addStoreChangeCreateNotif<Devis>(['projectDevis', 'lastCreated'], devis => `${devis.title} créé`));
    this.addSub(this._notificationService.addStoreChangeDeleteNotif<Devis>(['projectDevis', 'lastDeleted'], devis => `${devis.title} supprimé`));
  }

  onDevisClick(devis: Devis) {
    this.navigateToDevis(devis);
  }

  public navigateToDevis(devis: Devis) {
    this._router.navigate([devis.id], { relativeTo: this._route });
  }

  protected initProject(project) {
    this.title = `${project.name} - Devis`;
  }

  toggleCreation() {
    this.creation = !this.creation;
  }

  createDevis(devis: Devis) {
    this.navigateToDevis(devis);
  }

  public remove(devis: Devis) {
    this.dialog.confirm(`Supprimé ${devis.title} ?`, '').subscribe(confirmed => {
      if (confirmed) {
        this._devisActions.dispatchDelete(devis, this._ngRedux.getState().projects.selectedId);
      }
    });
  }

  public duplicate(devis: Devis) {
    let copy: Devis = Object.assign(new Devis(), devis);
    copy.id = null;
    copy.title += ' (copie)';
    this._devisActions.dispatchCreate(copy, copy.projectId);
  }

}
