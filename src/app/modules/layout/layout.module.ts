import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AutoLoginComponent } from './components/auto-login/auto-login.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { GainSummaryComponent } from "app/modules/layout/components/header/gain-summary/gain-summary.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserMenuComponent,
    GainSummaryComponent,
    AutoLoginComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    UserMenuComponent,
    AutoLoginComponent
  ]
})
export class LayoutModule { }