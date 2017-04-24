import { Component, OnInit } from '@angular/core';
import { CurrentSession } from 'app/core/services/session.service';

@Component({
  selector: 'app-my-manager',
  template: `<router-outlet></router-outlet>`
})
export class MyManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
