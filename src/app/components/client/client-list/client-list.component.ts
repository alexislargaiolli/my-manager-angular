import { ClientService } from './../../../services/client.service';
import { Client } from './../../../model/client.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  public clients: Client[];

  @Output()
  public clientSelect = new EventEmitter();

  constructor(private clientService: ClientService) { }

  public ngOnInit() {
    this.loadClients();
  }

  public selectClient(client: Client) {
    this.clientSelect.emit(client);
  }

  private loadClients() {
    this.clientService.getAll()
      .subscribe(clients => this.clients = clients,
      err => {
        console.log(err);
      });
  }

}
