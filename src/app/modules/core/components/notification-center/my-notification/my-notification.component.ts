import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { MyNotification } from '../../../models/my-notification.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'my-notification',
  templateUrl: './my-notification.component.html',
  styleUrls: ['./my-notification.component.scss'],
  animations: [
    trigger('notifAnim', [
      state('*', style({
        transform: 'translate(0%)',
        opacity: 1
      })),
      transition(':enter', [
        style({
          transform: 'translate(100%)',
          opacity: 0
        }),
        animate('400ms cubic-bezier(.06,.5,.27,1.3)')
      ]),
      transition(':leave', [
        animate('100ms ease-in',
          style({
            opacity: 0
          })
        )
      ])
    ])
  ]
})
export class MyNotificationComponent implements OnInit {

  @HostBinding('class') classes = 'rounded mat-elevation-z4';

  @HostBinding('@notifAnim') anim = true;

  @Input()
  public notification: MyNotification;

  @Input()
  private lifetime = 5000;

  @Output()
  public onLifetimeOver: EventEmitter<MyNotification>;

  private timerSubscription$: Subscription;


  constructor() {
    this.onLifetimeOver = new EventEmitter<MyNotification>();
  }

  ngOnInit() {
    this.timerSubscription$ = Observable.timer(5000, 5000).subscribe(t => {
      this.onLifetimeOver.emit(this.notification);
    })
  }

  ngOnDestroy() {
    this.timerSubscription$.unsubscribe();
  }

}
