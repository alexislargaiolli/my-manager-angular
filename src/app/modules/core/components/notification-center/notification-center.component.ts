import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { MyNotification } from '../../models/my-notification.model';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store.types';
import { ReduxSubscriptionComponent } from '../redux-subscription-component/redux-subscription-component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css'],
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
        style({
          height: '*',
          margin: '*'
        }),
        animate('100ms ease-in',
          style({
            opacity: 0,
            height: 0,
            margin: 0
          })
        )
      ])
    ])
  ]
})
export class NotificationCenterComponent extends ReduxSubscriptionComponent implements OnInit {

  public notifications: MyNotification[];

  constructor(private notificationService: NotificationService, private _ngRedux: NgRedux<IAppState>) {
    super();
    this.notifications = [];
  }

  ngOnInit() {
    this.addSub(
      this._ngRedux.select(['notifications', 'items']).subscribe((notifications: MyNotification[]) => {
        this.notifications = notifications;
      })
    );
  }

  public removeNotification(notification: MyNotification) {
    this.notificationService.removeNotification(notification);
  }

}
