import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfilePasswordComponent } from './components/user-profile-password/user-profile-password.component';
import { UserProfileGeneralComponent } from './components/user-profile-general/user-profile-general.component';
import { UserProfileRoutes } from './user-profile.routing';

@NgModule({
  imports: [
    SharedModule,
    UserProfileRoutes
  ],
  declarations: [
    UserProfileComponent,
    UserProfileGeneralComponent,
    UserProfilePasswordComponent
  ]
})
export class UserProfileModule { }
