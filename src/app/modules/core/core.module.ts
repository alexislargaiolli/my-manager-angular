import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/modules/shared/shared.module';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { EventsService } from './services/event.service';
import { DialogsService } from './services/dialog.service';
import { NotificationCenterComponent } from './components/notification-center/notification-center.component';
import { MyNotificationComponent } from './components/notification-center/my-notification/my-notification.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RepositoriesService } from './services/repositories/repositories.service';
import { BaseHttpService } from './services/repositories/base-http.service';
import { BackendConfig } from './models/backend.config';
import { PageNotFoundComponent } from "app/modules/core/components/page-not-found/page-not-found.component";

@NgModule({
  imports: [SharedModule],
  declarations: [
    NotificationCenterComponent,
    MyNotificationComponent,
    ConfirmDialogComponent,
    PageNotFoundComponent
  ],
  exports: [
    NotificationCenterComponent,
    ConfirmDialogComponent
  ],
  providers: [
    NotificationService,
    EventsService,
    ErrorService,
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
