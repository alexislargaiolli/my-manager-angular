import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientCreateComponent } from './components/commons/client-create/client-create.component';
import { ClientDetailComponent } from './components/commons/client-detail/client-detail.component';
import { ClientComponent } from './components/pages/home/client.component';
import { ClientListComponent } from './components/commons/client-list/client-list.component';
import { ClientRoutes } from './client.routing';

@NgModule({
  imports: [
    SharedModule,
    ClientRoutes
  ],
  declarations: [
    ClientComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientCreateComponent
  ],
  exports: [
    ClientCreateComponent
  ]
})
export class ClientModule { }
