import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Address } from 'app/models';
import { NgForm } from '@angular/forms';

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
