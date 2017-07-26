import { ClientDialogComponent } from './components/commons/client-dialog/client-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientCreateComponent } from './components/commons/client-create/client-create.component';
import { ClientDetailComponent } from './components/commons/client-detail/client-detail.component';
import { ClientListComponent } from './components/commons/client-list/client-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ClientListComponent,
    ClientDetailComponent,
    ClientCreateComponent,
    ClientDialogComponent
  ],
  exports: [
    ClientCreateComponent
  ],
  entryComponents: [
    ClientDialogComponent
  ]
})
export class ClientModule { }
