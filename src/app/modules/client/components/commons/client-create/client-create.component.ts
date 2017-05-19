import { Client } from 'app/models';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientCreateComponent implements OnInit {

  @Output()
  public create: EventEmitter<Client> = new EventEmitter<Client>();

  constructor() { }

  ngOnInit() {
  }

}
