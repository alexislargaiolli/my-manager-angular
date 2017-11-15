import { Component, OnInit, Input, EventEmitter, Output, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { MyNotification } from '../../../models/my-notification.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'my-notification',
  templateUrl: './my-notification.component.html',
  styleUrls: ['./my-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyNotificationComponent implements OnInit {

  @HostBinding('class') classes = 'rounded mat-elevation-z4';

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

  close() {
    this.onLifetimeOver.emit(this.notification);
  }

  ngOnDestroy() {
    this.timerSubscription$.unsubscribe();
  }

}
