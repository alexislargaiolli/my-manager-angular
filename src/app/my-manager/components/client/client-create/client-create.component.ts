import { Client } from 'app/my-manager/model/client.model';
import { ClientService } from 'app/my-manager/services/client.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  @Output()
  public onCreated: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

  public createClient(form: NgForm) {
    this.clientService.create(form.value).subscribe(client => {
      this.onCreated.emit(client);
      form.reset();
    });
  }

}