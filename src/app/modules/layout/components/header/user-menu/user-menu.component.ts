import { Component, OnInit } from '@angular/core';
import { CurrentSession, NotificationService } from 'app/modules/core';
import { AuthenticationService } from 'app/modules/auth';
import { NavigationService } from '../../../../project/services/navigation.service';

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
