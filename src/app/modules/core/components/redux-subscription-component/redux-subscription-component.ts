import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IModel } from 'app/modules/core/models/generic.model';

export abstract class ReduxSubscriptionComponent implements OnDestroy {

  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  addSub(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  unsubscribeAll() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
