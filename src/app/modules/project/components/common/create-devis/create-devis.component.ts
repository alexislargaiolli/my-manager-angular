import { Observable } from 'rxjs/Observable';
import { ProjectDevisActions } from './../../../../store/reducers/project-devis/project-devis.actions';
import { ProjectClientActions } from './../../../../store/reducers/project-client/project-client.actions';
import { Project } from './../../../../../models/project.model';
import { ProjectActions } from 'app/modules/store';
import { ClientActions } from './../../../../store/reducers/client/client.actions';
import { ProfileActions } from './../../../../store/reducers/profile/profile.actions';
import { ReduxSubscriptionComponent } from 'app/modules/core';
import { IAppState } from './../../../../store/store.types';
import { select, NgRedux } from '@angular-redux/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, Input } from '@angular/core';
import { Devis, Address, Client, Profile } from 'app/models';

@Component({
  selector: 'app-create-devis',
  templateUrl: './create-devis.component.html',
  styleUrls: ['./create-devis.component.scss']
})
export class CreateDevisComponent extends ReduxSubscriptionComponent implements OnInit {

  public readonly STEP_NAME = 'NAME';
  public readonly STEP_USER_ADDRESS = 'USER_ADDRESS';
  public readonly STEP_PROFILE_INFO = 'PROFILE_INFO';
  public readonly STEP_CLIENT = 'CLIENT';
  public readonly STEP_CLIENT_ADDRESS = 'CLIENT_ADDRESS';
  public readonly STEP_CREATION = 'CREATION';

  @Input()
  project: Project;

  @Output()
  create: EventEmitter<Devis> = new EventEmitter<Devis>();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter<any>();

  @select(['devis', 'creating'])
  devisCreating: Observable<boolean>;

  devisCountInProject: number;
  profile: Profile;
  userAddresses: Address[];
  clientAddresses: Address[];
  clients: Client[];
  steps = [];
  completeSteps = [];

  step = 0;
  devis: Devis;
  client: Client;
  clientCreatedSubscribed = false;

  constructor(
    private _ngRedux: NgRedux<IAppState>,
    private _profileActions: ProfileActions,
    private _clientActions: ClientActions,
    private _projectClientActions: ProjectClientActions,
    private _devisActions: ProjectDevisActions) {
    super();
  }

  ngOnInit() {
    this.devis = new Devis();
    this.devis.generateDevisId(this._ngRedux.getState().projectDevis.items.length);


    this.steps = [];
    this.profile = Object.assign(new Profile(), this._ngRedux.getState().profile.profile);

    // Check if compagny info step in necessary
    if (!this.profile.siret || !this.profile.phone) {
      this.addStep(this.STEP_PROFILE_INFO);
    } else {
      this.completeStep(this.STEP_PROFILE_INFO);
    }

    // Check if user address step in necessary
    if (this.profile.hasAddress()) {
      this.devis.userAddress = this.profile.getDefaultAddress();
      this.completeStep(this.STEP_USER_ADDRESS);
    } else {
      this.addStep(this.STEP_USER_ADDRESS);
    }

    // Check if client step in necessary
    if (this._ngRedux.getState().projectClient.items.length === 1) {
      this.client = Object.assign(new Client(), this._ngRedux.getState().projectClient.items[0]);
      this.devis.setClient(this.client);
      this.completeStep(this.STEP_CLIENT);
    } else {
      this.addStep(this.STEP_CLIENT);
    }

    // Check if client address step in necessary
    if (this.client && this.client.hasAddress()) {
      this.devis.clientAddress = this.client.getDefaultAddress();
      this.completeStep(this.STEP_CLIENT_ADDRESS);
    } else {
      this.addStep(this.STEP_CLIENT_ADDRESS);
    }

    this.addStep(this.STEP_NAME);
    this.addStep(this.STEP_CREATION);

    this.addSub(this._ngRedux.select(['profile', 'profile']).subscribe((profile: Profile) => {
      this.profile = Object.assign({}, profile);
      this.devis.importProfile(profile);
      this.userAddresses = Object.assign([], profile ? profile.addresses : []);
    }));
    this.addSub(this._ngRedux.select(['clients', 'items']).subscribe((clients: Client[]) => {
      this.clients = Object.assign([], clients);
    }));
  }

  private addStep(step: string) {
    this.steps.push(step);
  }

  private completeStep(step: string) {
    if (this.completeSteps.indexOf(step) === -1) {
      this.completeSteps.push(step);
    }
  }

  prevStep() {
    this.step--;
    if (this.step < 0) {
      this.cancel.emit();
    }
  }

  nextStep() {
    this.step++;
    if (this.isStepCreation()) {
      this.createDevis();
    }
  }

  createDevis() {
    this._devisActions.dispatchCreate(this.devis, this.project.id);
    this.addSub(this._ngRedux.select(['projectDevis', 'lastCreated']).subscribe((devis: Devis) => {
      if (devis) {
        this.create.emit(devis);
      }
    }));
  }

  devisInfo(ngForm: NgForm) {
    if (ngForm.valid) {
      this.devis.title = ngForm.value.title;
      this.completeStep(this.STEP_NAME);
      this.nextStep();
    }
  }

  userInfo(userProfileForm: NgForm) {
    if (userProfileForm.valid) {
      this.devis.siret = userProfileForm.value.siret;
      this.devis.userPhone = userProfileForm.value.phone;
      if (userProfileForm.value.siret || userProfileForm.value.phone) {
        this.completeStep(this.STEP_PROFILE_INFO);
        this._profileActions.dispatchUpdate(this.profile);
      }
      this.nextStep();
    }
  }

  createUserAddress(address: Address) {
    if (address.city || address.complement || address.street || address.zipcode) {
      this.profile.addresses.push(address);
      this._profileActions.dispatchUpdate(this.profile);
      this.devis.userAddress = address;
      this.completeStep(this.STEP_USER_ADDRESS);
    }
    this.nextStep();
  }

  selectUserAddress(address: Address) {
    this.devis.userAddress = address;
    this.completeStep(this.STEP_USER_ADDRESS);
    this.nextStep();
  }

  createClient(client: Client) {
    this.client = client;
    this._clientActions.dispatchCreate(this.client);
    if (!this.clientCreatedSubscribed) {
      this.addSub(this._ngRedux.select(['clients', 'lastCreated']).subscribe((client: Client) => {
        this.client = Object.assign(new Client(), client);
        this._projectClientActions.dispatchAddToProject(client, this.project.id);
      }));
      this.clientCreatedSubscribed = true;
    }
    this.completeStep(this.STEP_CLIENT);
    this.devis.setClient(client);
    this.nextStep();
  }

  selectClient(client: Client) {
    this.client = client;
    this.completeStep(this.STEP_CLIENT);
    this._projectClientActions.dispatchAddToProject(client, this.project.id);
    this.devis.setClient(client);
    this.nextStep();
  }

  selectClientAddress(address: Address) {
    this.devis.clientAddress = address;
    this.completeStep(this.STEP_CLIENT_ADDRESS);
    this.nextStep();
  }

  createClientAddress(address: Address) {
    if (address.city || address.complement || address.street || address.zipcode) {
      this.devis.clientAddress = address;
      this.client.addresses.push(address);
      this._clientActions.dispatchUpdate(this.client);
    }
    this.completeStep(this.STEP_CLIENT_ADDRESS);
    this.nextStep();
  }

  isStepActive(step: string): boolean {
    return this.steps[this.step] === step;
  }

  isStepComplete(step: string): boolean {
    return this.completeSteps.indexOf(step) !== -1;
  }

  isStepName() {
    return this.isStepActive(this.STEP_NAME);
  }

  isStepUserAddress() {
    return this.isStepActive(this.STEP_USER_ADDRESS);
  }

  isStepProfileInfo() {
    return this.isStepActive(this.STEP_PROFILE_INFO);
  }

  isStepClient() {
    return this.isStepActive(this.STEP_CLIENT);
  }

  isStepClientAddress() {
    return this.isStepActive(this.STEP_CLIENT_ADDRESS);
  }

  isStepCreation() {
    return this.isStepActive(this.STEP_CREATION);
  }

}
