import { ClientActions } from './../../../../store/reducers/client/client.actions';
import { Location } from '@angular/common';
import { AbstractProjectComponent } from './../abstract-project.component';
import { MdDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { DialogsService, NotificationService } from 'app/modules/core';
import { Project, Client } from 'app/models';
import { DateUtils } from 'app/modules/shared';
import { centerApparitionAnimation, leaveWorkaround } from 'app/animations';
import { IAppState, ProjectActions } from 'app/modules/store';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ProjectClientActions } from '../../../../store/reducers/project-client/project-client.actions';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss'],
  animations: [centerApparitionAnimation, leaveWorkaround]
})
export class ProjectSettingsComponent extends AbstractProjectComponent implements OnInit {

  @HostBinding('@leaveWorkaround') anim = true;

  @select(['projectClient', 'loading'])
  loadingClient$: Observable<boolean>;

  @select(['projectClient', 'items'])
  clients$: Observable<Client>;

  @select(['clients', 'items'])
  allClient$: Observable<Client>;

  constructor(
    protected _ngRedux: NgRedux<IAppState>,
    protected _location: Location,
    private _projectActions: ProjectActions,
    private _projectClientActions: ProjectClientActions,
    private _clientActions: ClientActions,
    private _router: Router,
    private _dialogsService: DialogsService
  ) {
    super(_ngRedux, _location);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public saveSettings(form: NgForm) {
    if (form.valid) {
      this.project.name = form.value.name;
      this.project.description = form.value.description;
    }
    // this.onUpdate.emit(this.project);
  };

  public deleteProject() {
    this._dialogsService.confirmGeneric().subscribe(confirm => {
      if (confirm === true) {
        this._projectActions.dispatchDelete(this.project);
        this._router.navigate(['/project']);
      }
    });
  }

  protected initProject(project) {
    this.title = `${project.name} - Options`;
  }

  public addClient(client: Client) {
    this._projectClientActions.dispatchAddToProject(client, this.project.id);
  }

  public createClient(client: Client) {
    this._clientActions.dispatchCreate(client);
  }

  public removeClient(client: Client) {
    this._projectClientActions.dispatchRemoveFromProject(client.id, this.project.id);
  }

}
