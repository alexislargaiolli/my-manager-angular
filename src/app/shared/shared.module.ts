import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysPipe } from 'app/shared/utils/keys.pipe';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdMenuModule, MdProgressBarModule, MdCardModule,
  MdInputModule, MdCheckboxModule, MdSelectModule, MdDialogModule,
  MdButtonToggleModule, MdTabsModule, MdIconModule, MdToolbarModule,
  MdProgressSpinnerModule, MdSlideToggleModule, MdRadioModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressPipe } from './utils/address.pipe';
import { AddressListComponent } from './components/address-list/address-list.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [
    KeysPipe,
    AddressListComponent,
    AddressPipe
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    KeysPipe,
    MdButtonModule,
    MdMenuModule,
    MdProgressBarModule,
    MdCardModule,
    MdInputModule,
    MdCheckboxModule,
    MdSelectModule,
    MdDialogModule,
    MdButtonToggleModule,
    MdTabsModule,
    MdIconModule,
    MdToolbarModule,
    MdProgressSpinnerModule,
    MdSlideToggleModule,
    MdRadioModule,
    AddressListComponent,
    AddressPipe
  ]
})
export class SharedModule { }
