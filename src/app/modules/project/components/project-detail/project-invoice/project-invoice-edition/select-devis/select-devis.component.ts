import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Devis } from 'app/models';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-select-devis',
  templateUrl: './select-devis.component.html',
  styleUrls: ['./select-devis.component.scss']
})
export class SelectDevisComponent implements OnInit {

  @select(['projectDevis', 'items'])
  public devisList$: Observable<Devis[]>;

  constructor(public dialogRef: MdDialogRef<SelectDevisComponent>) { }

  ngOnInit() {
  }

  public selectDevis(devis: Devis) {
    this.dialogRef.close(devis);
  }

}
