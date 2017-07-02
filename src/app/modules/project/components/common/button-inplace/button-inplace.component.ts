import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { trigger, transition, query, style, animate, group, state } from '@angular/animations';

@Component({
  selector: 'app-button-inplace',
  templateUrl: './button-inplace.component.html',
  styleUrls: ['./button-inplace.component.css'],
  animations: [
    trigger('inplaceAnim', [
      state('true', style({ height: 'auto' })),
      state('false', style({ height: '36px' })),
      transition('*=>*', [
        query(':enter', style({ position: 'absolute', opacity: 0, transform: 'translateX(-10%)' }), { optional: true }),
        query(':leave', [
          style({ opacity: '*', transform: 'translateX(0%)' }),
          animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(10%)' })),
          style({ position: 'absolute' })
        ], { optional: true }),

        group([
          animate('200ms ease-out'),
          query(':enter', [
            style('*'),
            style({ opacity: 0, transform: 'translateX(-10%)' }),
            animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
          ], { optional: true }),
        ]),


        query(':leave', style('*'), { optional: true }),
        query(':enter', style('*'), { optional: true }),
      ])
    ])
  ]
})
export class ButtonInplaceComponent implements OnInit {

  @Input()
  label: string;

  @HostBinding('@inplaceAnim')
  display: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public toggle() {
    this.display = !this.display;
  }

}
