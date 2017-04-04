import { ProjectService } from './../../../../services/project.service';
import { Client } from './../../../../model/client.model';
import { Project } from './../../../../model/project.model';
import { ClientService } from './../../../../services/client.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-client',
  templateUrl: './project-client.component.html',
  styleUrls: ['./project-client.component.css']
})
export class ProjectClientComponent implements OnInit {

  constructor(private projectService: ProjectService, private clientService: ClientService) { }

  @Input()
  public projectId: number;
  public clients: Client[];
  public selected:Client;
  public addMenuDisplayed: boolean = false;
  public createFormDisplayed: boolean = false;
  public addListDisplayed: boolean = false;
  public allClients: Client[];

  ngOnInit() {
    this.loadClients();
  }

  public selectClient(client){
    if(this.selected && client.id == this.selected.id){
      return this.unselect();
    }
    this.selected = client;
  }

  public unselect(){
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

  public removeSelected(){
    this.projectService.removeClient(this.projectId, this.selected.id).subscribe(project => {
      this.clients.splice(this.clients.findIndex((c) => c.id === this.selected.id), 1);
      this.unselect();
    });
  }

  private addClient(client) {
    this.projectService.addClient(this.projectId, client.id).subscribe(project => {
      this.clients.push(client);
    });
  }

  private loadClients() {
    this.projectService.getProjectClient(this.projectId).subscribe(clients => {
      this.clients = clients;
    });
  }

  private loadAllClients() {
    this.clientService.getAll().subscribe(clients => {
      this.allClients = clients;
    });
  }
}