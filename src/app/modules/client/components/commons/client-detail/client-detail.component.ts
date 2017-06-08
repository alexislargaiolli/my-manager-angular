import { Client } from 'app/models';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Address } from 'app/models';
import { ModelUtils } from 'app/modules/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailComponent implements OnInit {
  @Input()
  public client: Client;

  @Output()
  public delete: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  public save: EventEmitter<Client> = new EventEmitter<Client>();

  @Output()
  public unselect = new EventEmitter();

  constructor(private _ngRedux: NgRedux<IAppState>) {

  }

  public ngOnInit() { }

  public submitForm(form: NgForm) {
    if (form.valid) {
      this.saveClient();
    }
  }

  public saveClient() {
    this.save.emit(this.client);
  }

  public addAddress(address) {
    this.saveClient();
  }

  public removeAddress(address) {
    this.saveClient();
  }
}
