import { NotificationService, MyNotification } from './../../../services/notification.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent implements OnInit {

  private notificationSubscription: Subscription;

  private notifications: MyNotification[];

  constructor(private notificationService: NotificationService) {
    this.notifications = [];
   }

  ngOnInit() {
    this.notificationSubscription = this.notificationService.getNotification().subscribe(notification => {
      this.notifications.push(notification);
    });
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

  public removeNotification(notification: MyNotification) {
    this.notifications.splice(this.notifications.findIndex(n => n.id === notification.id), 1);
  }

}