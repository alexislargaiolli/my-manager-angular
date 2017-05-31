import { IModel } from 'app/modules/core';
import { Address } from './address.model';

export class Devis implements IModel {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public createDate: Date;
    public validityDate: Date;
    public devisId: string;
    public title: string;
    public siret: string;
    public project: number;
    public budget: number;
    public totalPrice: number;
    public paid: boolean;
    public paidDate: Date;
    public accepted: boolean;
    public acceptedDate: Date;
    public state: DevisState = DevisState.DRAFT;
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
        this.state = DevisState.DRAFT;
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

export enum DevisState {
    DRAFT,
    PENDING,
    ACCEPTED,
    REFUSED,
    PAID
}

export class DevisLine {
    public index: number;
    public content: string;
    public quantity: number;
    public unitPrice: number;
    public totalPrice: number;
    public static updateTotalPrice(line: DevisLine) {
        if (line.quantity && line.unitPrice) {
            line.totalPrice = line.quantity * line.unitPrice;
        } else {
            line.totalPrice = null;
        }
    }
}
