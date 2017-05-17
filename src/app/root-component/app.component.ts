import { Component, OnInit } from '@angular/core';
import { CurrentSession, RepositoriesService } from 'app/modules/core';
import { User } from 'app/modules/core/models/user.model';
import { Project } from 'app/models';
import { Client } from 'app/models';
import { Address } from 'app/models';
import { SessionActions } from '../modules/auth/redux/session/session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private currentSession: CurrentSession, private repositoriesService: RepositoriesService, private _sessionActions: SessionActions) { }

  ngOnInit() {
    this.repositoriesService.addManageClass(User.name, 'mmusers');
    this.repositoriesService.addManageClass(Project.name, 'projects');
    this.repositoriesService.addManageClass(Client.name, 'clients');
    this.repositoriesService.addManageClass(Address.name, 'addresses');
    this._sessionActions.dispatchReadFromLocalStorage();
    // this.currentSession.initialize();
  }
}
