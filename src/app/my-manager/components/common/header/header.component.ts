import { Component, OnInit } from '@angular/core';
import { CurrentSession } from 'app/core/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private currentSession: CurrentSession) { }

  ngOnInit() {
  }

  public get authenticated(){
    return this.currentSession.userId != null;
  }

}