import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ErrorService } from 'app/core/services/error.service';
import { NotificationService } from 'app/core/services/notification.service';
import { EventsService } from 'app/core/services/event.service';
import { CurrentSession } from 'app/core/services/session.service';
import { DialogsService } from 'app/core/services/dialog.service';
import { NotificationCenterComponent } from 'app/core/components/notification-center/notification-center.component';
import { MyNotificationComponent } from 'app/core/components/notification-center/my-notification/my-notification.component';
import { ConfirmDialogComponent } from 'app/core/components/confirm-dialog/confirm-dialog.component';
import { RepositoriesService } from 'app/core/services/repositories/repositories.service';
import { BackendConfig } from 'app/core';
import { BaseHttpService } from 'app/core/services/repositories/base-http.service';

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
    NotificationService,
    EventsService,
    ErrorService,
    CurrentSession,
    DialogsService,
    BaseHttpService,
    RepositoriesService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class CoreModule {
  static forRoot(config: BackendConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: BackendConfig, useValue: config }
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
