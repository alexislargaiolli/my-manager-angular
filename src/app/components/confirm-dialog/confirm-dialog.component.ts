import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: ` <p>{{title}}<p>
                <p>{{message}}</p>
                <button md-raised-button (click)="accept()">Ok</button>
                <button md-button (click)="decline()">Annuler</button>`,
})
export class ConfirmDialogComponent {
    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }

    public accept() {
        this.dialogRef.close(true);
    }

    public decline() {
        this.dialogRef.close(false);
    }
}
