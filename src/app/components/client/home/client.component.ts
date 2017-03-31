import { Client } from './../../../model/client.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public selectedClient: Client;

  constructor() { }

  public ngOnInit() { }

  public onSelectClient(client) {
    this.selectedClient = client;
  }

}
