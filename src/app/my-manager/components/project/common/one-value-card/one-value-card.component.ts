import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-one-value-card',
  templateUrl: './one-value-card.component.html',
  styleUrls: ['./one-value-card.component.scss']
})
export class OneValueCardComponent implements OnInit {

  @Input()
  public label: string;

  @Input()
  public icon: string;

  @Input()
  public unit: string;

  @Input()
  public value: number;

  constructor() { }

  ngOnInit() {
  }

}