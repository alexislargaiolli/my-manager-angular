import { Client } from 'app/models';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientCreateComponent implements OnInit {

  @Input()
  createButtonLabel = 'Créer';

  @Output()
  public create: EventEmitter<Client> = new EventEmitter<Client>();

  client: Client;

  constructor() { }

  ngOnInit() {
    this.client = new Client();
  }

  createClient(ngForm: NgForm) {
    if (ngForm.valid) {
      this.create.emit(this.client);
    }
  }

}
