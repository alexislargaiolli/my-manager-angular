import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdMenuModule, MdProgressBarModule, MdCardModule,
  MdInputModule, MdCheckboxModule, MdSelectModule, MdDialogModule,
  MdButtonToggleModule, MdTabsModule, MdIconModule, MdToolbarModule,
  MdProgressSpinnerModule, MdSlideToggleModule, MdRadioModule, MdNativeDateModule,
  MdDatepickerModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeysPipe } from './utils/keys.pipe';
import { AddressPipe } from './utils/address.pipe';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { InplaceComponent } from './components/inplace/inplace.component';

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
    AddressInputComponent,
    InplaceComponent,
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
    MdNativeDateModule,
    MdDatepickerModule,
    AddressListComponent,
    AddressPipe,
    AddressInputComponent,
    InplaceComponent
  ]
})
export class SharedModule { }
