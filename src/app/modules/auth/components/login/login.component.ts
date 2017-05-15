import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/modules/core';
import { NavigationService } from 'app/my-manager/services/navigation.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.navigationService.goProjectDashboard();
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      },
      err => {
        this.notificationService.addError(err);
        this.loading = false;
      });
  }
}