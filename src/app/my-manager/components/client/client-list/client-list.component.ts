import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Client } from 'app/my-manager/model/client.model';
import { ClientService } from 'app/my-manager/services/client.service';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  @Input()
  public clients: Client[];

  @Output()
  public clientSelect = new EventEmitter();

  constructor(private clientService: ClientService) { }

  public ngOnInit() {

  }

  public selectClient(client: Client) {
    this.clientSelect.emit(client);
  }
}
