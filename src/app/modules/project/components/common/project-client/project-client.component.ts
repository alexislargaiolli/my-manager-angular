import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Client } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'project-client',
  templateUrl: './project-client.component.html',
  styleUrls: ['./project-client.component.scss'],
})
export class ProjectClientComponent implements OnInit {

  @Input('loading')
  public loading$: Observable<boolean>;

  @Input()
  public clients: Client[];

  @Input()
  public allClients: Client[];

  @Output()
  add: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  create: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  remove: EventEmitter<Client> = new EventEmitter<Client>();

  public selected: Client;

  public state: string = 'default';
  public addMenuDisplayed = false;
  public createFormDisplayed = false;
  public addListDisplayed = false;

  constructor() { }

  public ngOnInit() { }

  public selectClient(client) {
    if (this.selected && client.id === this.selected.id) {
      return this.unselect();
    }
    this.selected = client;
  }

  public unselect() {
    this.selected = null;
  }

  public showMenu() {
    this.state = 'menu';
  }

  public cancel() {
    this.state = 'default';
  }

  public showImport() {
    this.state = 'import';
  }

  public showCreate() {
    this.state = 'create';
  }

  public showCreateForm() {
    this.createFormDisplayed = true;
    this.addListDisplayed = false;
  }

  public showAddList() {
    this.createFormDisplayed = false;
    this.addListDisplayed = true;
  }

  public cancelAdd() {
    this.addMenuDisplayed = false;
    this.createFormDisplayed = false;
    this.addListDisplayed = false;
  }

  public onClientCreated(client) {
    this.cancelAdd();
    this.addClient(client);
  }

  public importClient(client) {
    this.cancelAdd();
    this.addClient(client);
  }

  public removeClient(client) {
    this.remove.emit(client);
  }

  private addClient(client) {
    this.add.emit(client);
  }

  private toggleClient(event, client) {
    if (event.checked) {
      this.addClient(client);
    }
    else {
      this.removeClient(client);
    }
  }

  public createClient(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
      form.reset();
      this.showMenu();
    }
  }

  public isSelected(client: Client) {
    return this.clients.findIndex(c => c.id === client.id) != -1;
  }

}
