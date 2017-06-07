import { IModel } from 'app/modules/core';
import { Address } from './address.model';
import { DevisLine } from 'app/models';

export class Invoice implements IModel {
    public static readonly REPO_KEY = 'Invoice';
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public createDate: Date;
    public validityDate: Date;
    public invoiceId: string;
    public title: string;
    public siret: string;
    public project: number;
    public totalPrice: number;
    public paidDate: Date;
    public state: InvoiceState = InvoiceState.DRAFT;
    public clientName: string;
    public userName: string;
    public userPhone: string;
    public userMail: string;
    public clientAddress: Address;
    public userAddress: Address;
    public lines: DevisLine[];

    constructor() {
        this.userAddress = new Address();
        this.clientAddress = new Address();
        this.lines = [];
        this.state = InvoiceState.DRAFT;
    }

    public addLine(line: DevisLine) {
        if (this.lines === null) {
            this.lines = [];
        }
        line.index = this.lines.length;
        DevisLine.updateTotalPrice(line);
        this.lines.push(line);
        this.updateTotalPrice();
    }

    public updateTotalPrice() {
        this.totalPrice = 0;
        for (const line of this.lines) {
            if (line.totalPrice) {
                this.totalPrice += line.totalPrice;
            }
        }
    }
}

export enum InvoiceState {
    DRAFT,
    PENDING,
    PAID,
    ABANDONED
}
