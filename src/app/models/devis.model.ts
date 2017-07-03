import { IModel } from 'app/modules/core';
import { Address } from './address.model';
import * as moment from 'moment';
import { Profile, Client } from 'app/models';

export class Devis implements IModel {
    public static readonly REPO_KEY = 'Devis';
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public createDate: Date;
    public validityDate: Date;
    public devisId: string;
    public title: string;
    public siret: string;
    public projectId: number;
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
        this.createDate = new Date();
        this.validityDate = moment().add(1, 'month').toDate();
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

    public importProfile(profile: Profile) {
        if (profile.addresses != null && profile.addresses.length > 0) {
            this.userAddress = profile.addresses[0];
        }
        this.userName = `${profile.firstname}  ${profile.lastname}`;
        this.siret = profile.siret;
        this.userPhone = profile.phone;
        this.userMail = profile.email;
    }

    public importClient(client: Client) {
        if (client.addresses != null && client.addresses.length > 0) {
            this.clientAddress = client.addresses[0];
        }
        this.clientName = client.name;
    }

    public generateFileName() {
        const client = this.clientName ? ' - ' + this.clientName : '';
        const username = this.userName ? ' - ' + this.userName : '';
        const date = this.createDate ? moment(this.createDate).format(' - DD-MM-YY') : moment().format(' - DD-MM-YY');
        return `Devis${username}${client}${date}.pdf`;
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
