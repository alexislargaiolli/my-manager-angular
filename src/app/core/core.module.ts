import { NgModule } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import { ErrorService } from 'app/core/services/error.service';
import { NotificationService } from 'app/core/services/notification.service';
import { EventsService } from 'app/core/services/event.service';
import { NotificationCenterComponent } from 'app/core/components/notification-center/notification-center.component';
import { MyNotificationComponent } from 'app/core/components/notification-center/my-notification/my-notification.component';
import { CurrentSession } from 'app/core/services/session.service';
import { ConfirmDialogComponent } from 'app/core/components/confirm-dialog/confirm-dialog.component';
import { DialogsService } from 'app/core/services/dialog.service';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [
    NotificationCenterComponent,
    MyNotificationComponent,
    ConfirmDialogComponent
  ],
  exports: [
    NotificationCenterComponent,
    ConfirmDialogComponent
  ],
  providers: [
    UserService,
    ErrorService,
    NotificationService,
    EventsService,
    CurrentSession,
    DialogsService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class CoreModule { }