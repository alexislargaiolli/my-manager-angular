import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserMenuComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    UserMenuComponent
  ]
})
export class LayoutModule { }