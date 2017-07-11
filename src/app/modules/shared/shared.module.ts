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
  MdDatepickerModule,
  MdTooltipModule,
  MdSidenavModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeysPipe } from './utils/keys.pipe';
import { AddressPipe } from './utils/address.pipe';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressInputComponent } from './components/address-input/address-input.component';
import { InplaceComponent } from './components/inplace/inplace.component';
import { InplaceDateComponent } from './components/inplace-date/inplace-date.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { ListItemActionsComponent } from './components/list/list-item-actions/list-item-actions.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ListItemDirective } from './components/list/list-item-directive/list-item.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdProgressBarModule,
  ],
  declarations: [
    KeysPipe,
    AddressListComponent,
    AddressInputComponent,
    InplaceComponent,
    AddressPipe,
    InplaceDateComponent,
    ListComponent,
    ListItemComponent,
    ListItemDirective,
    ListItemActionsComponent,
    SpinnerComponent
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
    InplaceComponent,
    InplaceDateComponent,
    MdTooltipModule,
    MdSidenavModule,
    ListComponent,
    ListItemComponent,
    ListItemDirective,
    ListItemActionsComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
