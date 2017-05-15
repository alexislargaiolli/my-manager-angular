import { Routes, RouterModule } from '@angular/router';
import { UserProfilePasswordComponent } from './components/user-profile-password/user-profile-password.component';
import { UserProfileGeneralComponent } from './components/user-profile-general/user-profile-general.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from 'app/modules/auth';

const routes: Routes = [
  {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard],
    children: [
      { path: 'general', component: UserProfileGeneralComponent, canActivate: [AuthGuard] },
      { path: 'password', component: UserProfilePasswordComponent, canActivate: [AuthGuard] },
    ]
  },
];

export const UserProfileRoutes = RouterModule.forChild(routes);
