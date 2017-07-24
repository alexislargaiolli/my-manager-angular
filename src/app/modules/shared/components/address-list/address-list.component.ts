import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from 'app/models';
import { ModelUtils } from '../../../core/models/model.utils';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressListComponent implements OnInit {

  @Input()
  public addresses: Address[];

  @Output()
  public onCreate: EventEmitter<Address> = new EventEmitter<Address>();

  @Output()
  public onSaved: EventEmitter<Address> = new EventEmitter<Address>();

  @Output()
  public onDelete: EventEmitter<Address> = new EventEmitter<Address>();

  @Output()
  public onSelect: EventEmitter<Address> = new EventEmitter<Address>();

  public creation = false;

  public selected: Address = null;

  constructor() { }

  ngOnInit() {
  }

  public save(ngForm: NgForm) {
    if (ngForm.valid) {
      this.selected.street = ngForm.value.street;
      this.selected.city = ngForm.value.city;
      this.selected.zipcode = ngForm.value.zipcode;
      this.selected.complement = ngForm.value.complement;
      if (this.creation) {
        this.onCreate.emit(this.selected);
      } else {
        this.onSaved.emit(this.selected);
      }
      this.unselect();
    }
  }

  public select(address: Address) {
    this.creation = false;
    this.onSelect.emit(address);
    this.selected = address;
  }

  public create() {
    this.creation = true;
    this.selected = new Address();
    // this.addresses.push(this.selected);
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
