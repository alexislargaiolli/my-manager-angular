import { ClientService } from '../../../services/client.service';
import { Client } from './../../../model/client.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public selectedClient: Client;
  public clients: Client[];

  constructor(private clientService: ClientService) { }

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
    this.clientService.delete(this.selectedClient).subscribe(client => {
      this.clients.splice(this.clients.findIndex(c => c.id == this.selectedClient.id), 1);
      this.unselect();
    });
  }

  private loadClients() {
    this.clientService.getAll()
      .subscribe(clients => this.clients = clients,
      err => {
        console.log(err);
      });
  }

}
