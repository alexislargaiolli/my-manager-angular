import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { MyNotification } from '../../models/my-notification.model';
import { select } from '@angular-redux/store';
import { IAppState } from '../../../store/store.types';
import { ReduxSubscriptionComponent } from '../redux-subscription-component/redux-subscription-component';
import { trigger, state, style, transition, animate, group, query } from '@angular/animations';
import { Observable } from 'rxjs/Observable';

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
        animate('300ms cubic-bezier(.06,.5,.27,1.3)')
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        group([
          query('.notif-icon',
            animate('200ms ease-in',
              style({
                opacity: 0,
                height: 0
              })
            )
          ),
          animate('200ms ease-in',
            style({
              opacity: 0,
              height: 0
            })
          )
        ])
      ])
    ])
  ]
})
export class NotificationCenterComponent extends ReduxSubscriptionComponent implements OnInit {

  @select(['notifications', 'items'])
  public notifications$: Observable<MyNotification[]>;

  constructor(private notificationService: NotificationService) {
    super();
  }

  ngOnInit() { }

  public removeNotification(notification: MyNotification) {
    this.notificationService.removeNotification(notification);
  }

}
