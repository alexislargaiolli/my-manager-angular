import { Component, OnInit } from '@angular/core';
import { CurrentSession } from 'app/modules/core';

@Component({
  selector: 'app-my-manager',
  template: `<router-outlet></router-outlet>`,
  styles: [':host {display:flex;flex:1;}']
})
export class MyManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
