import { Component, OnInit } from '@angular/core';
import { CurrentSession } from 'app/modules/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private currentSession: CurrentSession) { }

  ngOnInit() {
  }

  public get authenticated(){
    return this.currentSession.userId != null;
  }

}