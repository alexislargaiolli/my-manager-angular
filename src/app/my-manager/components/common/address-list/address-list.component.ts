import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Address } from 'app/my-manager/model/address.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  @Input()
  private addresses: Address[];

  @Output()
  private onSaved: EventEmitter<Address>;

  @Output()
  private onDelete: EventEmitter<Address>;

  /**
   * True to show create form
   */
  private creation = false;

  private selected: Address = null;

  constructor() {
    this.onSaved = new EventEmitter<Address>();
    this.onDelete = new EventEmitter<Address>();
  }

  ngOnInit() {
  }

  public save(ngForm: NgForm) {
    this.selected.street = ngForm.value.street;
    this.selected.zipcode = ngForm.value.zipcode;
    this.selected.city = ngForm.value.city;
    this.onSaved.emit(this.selected);
    this.unselect();
  }

  public select(address: Address) {
    this.selected = address;
    if (this.selected == null) {
      this.selected = new Address();
    }
  }

  public unselect() {
    this.selected = null;
  }

  public delete(address: Address) {
    this.onDelete.emit(address);
    this.unselect();
  }
}
