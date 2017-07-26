import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Client } from 'app/models';
import { Observable } from 'rxjs/Observable';
import { createEpicMiddleware } from 'redux-observable';
import { listFadeAnim, fadeAnim } from 'app/animations';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent implements OnInit {

  @Input()
  public clients: Client[];

  @Input()
  public loading: boolean;

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
