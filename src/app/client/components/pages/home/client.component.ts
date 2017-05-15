import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Client } from 'app/models';
import { ClientService } from 'app/my-manager/services/client.service';
import { NotificationService } from 'app/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public selectedClient: Client;
  public loading = false;
  public clients: Client[];

  constructor(private clientService: ClientService, private notification: NotificationService) {
    this.clientService.activeDebug();
  }

  public ngOnInit() {
    this.loadClients();
  }

  public onSelectClient(client) {
    this.selectedClient = client;
  }

  public unselect() {
    this.selectedClient = null;
  }

  public deleteClient(client) {
    this.clients.splice(this.clients.findIndex(c => c.id === this.selectedClient.id), 1);
    this.unselect();
  }

  public addClient(client: Client) {
    this.clients.push(client);
  }

  public onUpdate(client: Client) {

  }

  private loadClients() {
    this.loading = true;
    this.clientService.getAll()
      .subscribe(clients => {
        this.clients = clients;
        this.loading = false;
      });
  }

}
