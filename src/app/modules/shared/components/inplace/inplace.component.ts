import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-inplace',
  templateUrl: './inplace.component.html',
  styleUrls: ['./inplace.component.scss']
})
export class InplaceComponent implements OnInit {

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  display = false;

  @Input()
  showSaveButton = true;

  constructor() { }

  ngOnInit() {
  }

  public toggle() {
    this.display = !this.display;
    if (!this.display) {
      this.onSave.emit();
    }
  }

}
