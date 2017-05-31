import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from 'app/models';
import { ModelUtils } from '../../../core/models/model.utils';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  @Input()
  public addresses: Address[];

  @Output()
  public onSaved: EventEmitter<Address>;

  @Output()
  public onDelete: EventEmitter<Address>;

  /**
   * True to show create form
   */
  public creation = false;

  public selected: Address = null;

  constructor() {
    this.onSaved = new EventEmitter<Address>();
    this.onDelete = new EventEmitter<Address>();
  }

  ngOnInit() {
  }

  public save(ngForm: NgForm) {
    if (ngForm.valid) {
      this.selected.street = ngForm.value.street;
      this.selected.city = ngForm.value.city;
      this.selected.zipcode = ngForm.value.zipcode;
      this.selected.complement = ngForm.value.complement;
      this.onSaved.emit(this.selected);
      this.unselect();
    }
  }

  public select(address: Address) {
    this.selected = address;
  }

  public create() {
    this.selected = new Address();
    this.addresses.push(this.selected);
  }

  public unselect() {
    this.selected = null;
  }

  public delete(address: Address) {
    ModelUtils.remove(this.addresses, address);
    this.onDelete.emit(address);
    this.unselect();
  }
}
