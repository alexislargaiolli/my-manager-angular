import { Client } from 'app/my-manager/model/client.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  @Input()
  public client: Client;

  @Output()
  public onDelete: EventEmitter<Client> = new EventEmitter<Client>();

  constructor() { }

  public ngOnInit() { }

  public delete() {
    this.onDelete.emit(this.client);
  }

}
