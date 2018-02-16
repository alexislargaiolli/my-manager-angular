import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HistoryEntryType, HistoryEntry } from 'app/models';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-create-history-entry-dialog',
  templateUrl: './create-history-entry-dialog.component.html',
  styleUrls: ['./create-history-entry-dialog.component.scss']
})
export class CreateHistoryEntryDialogComponent implements OnInit {

  entry: HistoryEntry;

  selectableEntries = [HistoryEntryType.WORK_TRACKING, HistoryEntryType.CONTACT_MAIL, HistoryEntryType.CONTACT_PHONE, HistoryEntryType.CONTACT_RDV, HistoryEntryType.OTHER];

  entryTypes = HistoryEntryType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: HistoryEntry,
    public dialogRef: MatDialogRef<CreateHistoryEntryDialogComponent>
  ) {
    if (data) {
      this.entry = data;
    } else {
      this.entry = new HistoryEntry();
      this.entry.type = HistoryEntryType.WORK_TRACKING;
      this.entry.title = 'Journée travaillée ';
    }
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onTypeChange(event) {
    switch (event.value) {
      case HistoryEntryType.CONTACT_MAIL:
        this.entry.title = 'Mail envoyé à ';
        break;
      case HistoryEntryType.CONTACT_PHONE:
        this.entry.title = 'Appel avec ';
        break;
      case HistoryEntryType.CONTACT_RDV:
        this.entry.title = 'Rendez-vous avec ';
        break;
      case HistoryEntryType.WORK_TRACKING:
        this.entry.title = 'Journée travaillée ';
      case HistoryEntryType.OTHER:
        this.entry.title = '';
        break;
    }
  }

  create(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.entry);
    }
  }


}
