import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square-list',
  templateUrl: './square-list.component.html',
  styleUrls: ['./square-list.component.scss'],
})
export class SquareListComponent implements OnInit {

  @Input()
  loading: boolean;

  slots = [1, 1, 1, 1];

  constructor() {
  }

  ngOnInit() {
  }

}
