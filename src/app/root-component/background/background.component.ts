import { Component, OnInit, HostBinding } from '@angular/core';
import { state, style, transition, animate, trigger } from '@angular/animations';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  animations: [
    trigger('backgroundAnimation', [
      state('*', style({
        'filter': 'blur(5px)',
      })),
      transition(':enter', [
        style({
          'filter': 'blur(0px)',
        }),
        animate('2000ms ease-in')
      ])
    ])
  ]
})
export class BackgroundComponent implements OnInit {

  @HostBinding('@backgroundAnimation') anim = true;

  constructor() { }

  ngOnInit() {
  }

}
