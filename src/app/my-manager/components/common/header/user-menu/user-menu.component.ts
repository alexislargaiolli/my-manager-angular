import { Component, OnInit } from '@angular/core';
import { CurrentSession } from 'app/core/services/session.service';
import { AuthenticationService } from 'app/auth';
import { NotificationService } from 'app/core/services/notification.service';
import { NavigationService } from 'app/my-manager/services/navigation.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {


  constructor(private currentSession: CurrentSession,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private navigationService: NavigationService) { }

  ngOnInit() { }

  public logout() {
    this.authenticationService.logout().subscribe(loggedOut => {
      if (loggedOut) {
        this.notificationService.addInfo('Déconnexion réussie.');
        this.navigationService.goToLogin();
      }
    }, error => {
      this.notificationService.addError('Erreur lors de la déconnexion.');
    });
  }

  get username() {
    return this.currentSession.username;
  }

}
