import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, style, state, transition, animate, keyframes, useAnimation, group, animateChild, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('250ms ease', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('500ms ease', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ]),
    trigger('whiteBackgroundAnim', [
      state('*', style({

      })),
      state('login', style({
        transform: 'translateX(65%)'
      })),
      state('register', style({
        transform: 'translateX(0%)'
      })),
      transition('login => register', [
        animate('200ms ease-out', style({ transform: 'translateX(-10%)' })),
        animate('150ms ease-in-out', style({ transform: 'translateX(2%)' })),
        animate('100ms ease-in-out', style({ transform: 'translateX(-1%)' })),
        animate('100ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition('register => login', [
        animate('200ms ease-out', style({ transform: 'translateX(75%)' })),
        animate('150ms ease-in-out', style({ transform: 'translateX(63%)' })),
        animate('100ms ease-in-out', style({ transform: 'translateX(66%)' })),
        animate('100ms ease-in-out', style({ transform: 'translateX(65%)' }))
      ])
    ]),
    trigger('leftApparition', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0%)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-50%)'
        }),
        animate('.3s cubic-bezier(.06,.6,.3,1.6)')
      ])
    ]),
    trigger('fadeApparition', [
      state('*',
        style({
          opacity: 1,
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('.3s ease-out', style({
          opacity: 1,
        })),
        animateChild()
      ])
    ]),

    trigger('popupApparition', [
      state('*',
        style({
          opacity: 1
        })
      ),
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('200ms 100ms ease-out'),
      ])
    ])
  ]
})
export class LoginRegisterComponent implements OnInit {

  @HostBinding('@inOut')
  private hostAnimations = 'in';

  state = 'login';

  constructor() { }

  ngOnInit() {
  }

  register() {
    this.state = 'register';
  }

  login() {
    this.state = 'login';
  }

}
