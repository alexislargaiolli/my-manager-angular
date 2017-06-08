import { Component, OnInit, HostBinding } from '@angular/core';
import { Devis } from 'app/models';
import { NavigationService } from '../../../services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { centerApparitionAnimation } from 'app/animations';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-project-devis',
  templateUrl: './project-devis.component.html',
  styleUrls: ['./project-devis.component.scss'],
  animations: [centerApparitionAnimation]
})
export class ProjectDevisComponent implements OnInit {

  @select(['projectDevis', 'items'])
  devis$: Observable<Devis[]>;

  @select(['projectDevis', 'loading'])
  loading$: Observable<boolean>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() { }

  onDevisClick(devis: Devis) {
    this._router.navigate([devis.id], { relativeTo: this._route });
  }

}
