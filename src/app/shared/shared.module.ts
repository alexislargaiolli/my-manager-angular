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

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KeysPipe
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
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
    MdRadioModule
  ]
})
export class SharedModule { }
