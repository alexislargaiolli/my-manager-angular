import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/core/services/user.service';
import { ErrorService } from 'app/core/services/error.service';
import { NotificationService } from 'app/core/services/notification.service';
import { EventsService } from 'app/core/services/event.service';
import { NotificationCenterComponent } from 'app/core/components/notification-center/notification-center.component';
import { MyNotificationComponent } from 'app/core/components/notification-center/my-notification/my-notification.component';
import { CurrentSession } from 'app/core/services/session.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotificationCenterComponent,
    MyNotificationComponent
  ],
  exports: [
    NotificationCenterComponent
  ],
  providers: [
    UserService,
    ErrorService,
    NotificationService,
    EventsService,
    CurrentSession
  ]
})
export class CoreModule { }