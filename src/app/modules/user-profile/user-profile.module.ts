import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfilePasswordComponent } from './components/user-profile-password/user-profile-password.component';
import { UserProfileGeneralComponent } from './components/user-profile-general/user-profile-general.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  imports: [
    SharedModule,
    UserProfileRoutingModule
  ],
  declarations: [
    UserProfileComponent,
    UserProfileGeneralComponent,
    UserProfilePasswordComponent
  ]
})
export class UserProfileModule { }
