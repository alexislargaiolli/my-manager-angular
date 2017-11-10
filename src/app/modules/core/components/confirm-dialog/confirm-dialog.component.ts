import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: ` <p>{{title}}<p>
                <p>{{message}}</p>                
                <button md-button (click)="accept()"><md-icon class="mr-2 text-success">check_circle</md-icon>Ok</button>
                <button md-button (click)="decline()"><md-icon class="mr-2 text-danger">cancel</md-icon>Annuler</button>`,
})
export class ConfirmDialogComponent {
    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

    public accept() {
        this.dialogRef.close(true);
    }

    public decline() {
        this.dialogRef.close(false);
    }
}
