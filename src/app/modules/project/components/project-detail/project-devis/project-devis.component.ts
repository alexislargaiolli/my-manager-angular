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

  constructor(
    private _route: ActivatedRoute,
    protected _router: Router,
    protected _location: Location,
    protected _ngRedux: NgRedux<IAppState>
  ) {
    super(_ngRedux, _location);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onDevisClick(devis: Devis) {
    this._router.navigate([devis.id], { relativeTo: this._route });
  }

  protected initProject(project) {
    this.title = `${project.name} - Devis`;
  }

}
