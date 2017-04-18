import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { CurrentSession } from 'app/core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private currentSession: CurrentSession) { }

  ngOnInit() {
    this.currentSession.initialize();
  }
}
