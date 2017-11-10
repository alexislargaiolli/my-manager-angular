import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: ` <p>{{title}}<p>
                <p>{{message}}</p>                
                <button mat-button (click)="accept()"><mat-icon class="mr-2 text-success">check_circle</mat-icon>Ok</button>
                <button mat-button (click)="decline()"><mat-icon class="mr-2 text-danger">cancel</mat-icon>Annuler</button>`,
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
