import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Client } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { createEpicMiddleware } from 'redux-observable';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent implements OnInit {

  @Input('clients')
  public clients$: Observable<Client[]>;

  @Input('loading')
  public loading$: Observable<boolean>;

  @Output()
  public clientSelect = new EventEmitter();

  @Output()
  public create = new EventEmitter();

  constructor() { }

  public ngOnInit() { }

  public selectClient(client: Client) {
    this.clientSelect.emit(client);
  }
}
