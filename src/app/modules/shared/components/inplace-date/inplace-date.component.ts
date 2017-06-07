import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdDatepicker } from "@angular/material";

@Component({
  selector: 'app-inplace-date',
  templateUrl: './inplace-date.component.html',
  styleUrls: ['./inplace-date.component.css']
})
export class InplaceDateComponent implements OnInit {

  @Output()
  dateChange: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  valueLabel: string;

  @Input()
  noValueLabel: string;

  _date: Date;

  display = false;

  constructor() { }

  ngOnInit() {
  }

  public toggle() {
    this.display = !this.display;
  }

  public save(form: NgForm) {
    if (form.valid) {
      this.date = form.value.date;
      this.toggle();
    }
  }

  public cancel(form: NgForm) {
    form.reset();
    this.toggle();
  }

  set date(date: Date) {
    this._date = date;
    this.dateChange.emit(this._date);
  }

  @Input()
  get date() {
    return this._date;
  }

}
