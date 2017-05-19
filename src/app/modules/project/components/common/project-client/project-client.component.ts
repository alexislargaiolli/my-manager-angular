import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Client } from 'app/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'project-client',
  templateUrl: './project-client.component.html',
  styleUrls: ['./project-client.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectClientComponent implements OnInit {

  @Input('clients')
  public clients$: Observable<Client[]>;

  @Input('allClient')
  public allClients$: Observable<Client[]>;

  @Output()
  add: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  remove: EventEmitter<Client> = new EventEmitter<Client>();

  public selected: Client;
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

  public removeSelected() {
    this.remove.emit(this.selected);
  }

  private addClient(client) {
    this.add.emit(client);
  }

}
