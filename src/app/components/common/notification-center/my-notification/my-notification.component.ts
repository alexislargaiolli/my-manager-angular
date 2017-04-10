import { MyNotification } from './../../../../services/notification.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-notification',
  templateUrl: './my-notification.component.html',
  styleUrls: ['./my-notification.component.css']
})
export class MyNotificationComponent implements OnInit {

  @Input()
  public notification: MyNotification;

  @Input()
  private lifetime: number = 5000;
  
  @Output()
  public onLifetimeOver: EventEmitter<MyNotification>;

  private timerSubscription$: Subscription;


  constructor() {
    this.onLifetimeOver = new EventEmitter<MyNotification>();
  }

  ngOnInit() {
    this.timerSubscription$ = Observable.timer(5000, 5000).subscribe(t=>{
      this.onLifetimeOver.emit(this.notification);
    })
  }

  ngOnDestroy(){
    this.timerSubscription$.unsubscribe();
  }

}