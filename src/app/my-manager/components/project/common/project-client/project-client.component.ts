import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'app/my-manager/services/project.service';
import { ClientService } from 'app/my-manager/services/client.service';
import { Client } from 'app/my-manager/model/client.model';

@Component({
  selector: 'project-client',
  templateUrl: './project-client.component.html',
  styleUrls: ['./project-client.component.css']
})
export class ProjectClientComponent implements OnInit {

  @Input()
  public projectId: number;
  public clients: Client[];
  public selected: Client;
  public addMenuDisplayed = false;
  public createFormDisplayed = false;
  public addListDisplayed = false;
  public allClients: Client[];

  constructor(private projectService: ProjectService, private clientService: ClientService) { }

  public ngOnInit() {
    this.loadClients();
  }

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
    this.loadAllClients();
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
    this.clientService.removeFromProject(this.projectId, this.selected.id).subscribe(project => {
      this.clients.splice(this.clients.findIndex((c) => c.id === this.selected.id), 1);
      this.unselect();
    });
  }

  private addClient(client) {
    this.clientService.addToProject(this.projectId, client.id).subscribe(project => {
      this.clients.push(client);
    });
  }

  private loadClients() {
    this.clientService.getByProject(this.projectId).subscribe(clients => {
      this.clients = clients;
    });
  }

  private loadAllClients() {
    this.clientService.getAll().subscribe(clients => {
      this.allClients = clients;
    });
  }
}