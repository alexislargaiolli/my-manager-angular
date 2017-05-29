import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css']
})
export class AddressInputComponent implements OnInit {

  @Input()
  street: string;

  @Output()
  streetChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  city: string;

  @Output()
  cityChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  zipcode: string;

  @Output()
  zipcodeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
