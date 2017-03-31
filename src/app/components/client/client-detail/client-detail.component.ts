import { Client } from './../../../model/client.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  @Input()
  public client: Client;

  constructor() { }

  public ngOnInit() { }

}
