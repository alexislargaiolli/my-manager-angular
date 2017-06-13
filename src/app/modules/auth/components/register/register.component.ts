import { Component, OnInit, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionActions } from 'app/modules/auth';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/modules/store';
import { ReduxSubscriptionComponent } from '../../../core/components/redux-subscription-component/redux-subscription-component';
import { useAnimation, transition, trigger, query, style, animate, stagger, group } from '@angular/animations';
import { fadeAnim } from 'app/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('listFadeAnim', [
      transition(':enter', [
        query('p', style({ opacity: 0, transform: 'translateX(-30%)' }), { optional: true }),

        query('p', stagger('100ms', [
          group([
            animate('300ms ease-in', style({ opacity: 1 })),
            animate('200ms ease-out', style({ transform: 'translateX(0%)' }))
          ])
        ]), { optional: true })
      ])
    ]),
    fadeAnim
  ]
})
export class RegisterComponent extends ReduxSubscriptionComponent implements OnInit {

  registered = false;
  loading = false;

  constructor(private _sessionActions: SessionActions, private _redux: NgRedux<IAppState>) {
    super();
  }

  ngOnInit() {
    this.addSub(this._redux.select(['session', 'register']).subscribe(registerData => {
      this.registered = registerData['registered'] === true;
      this.loading = registerData['registering'] === true;
    }));
  }

  register(form: NgForm) {
    if (form.valid) {
      this._sessionActions.dispatchRegister(form.value);
    }
  }
}
