import { IModel } from 'app/modules/core';
import { Address } from './address.model';
import { DevisLine, Profile, Client, Devis } from 'app/models';
import * as moment from 'moment';

export class Invoice implements IModel {
    invoice: any;
    public static readonly REPO_KEY = 'Invoice';
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public createDate: Date;
    public validityDate: Date;
    public invoiceId: string;
    public title: string;
    public siret: string;
    public projectId: number;
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

    public importDevis(devis: Devis) {
        this.lines.push(...devis.lines);
        this.title = devis.title;
    }

    public generateFileName() {
        const client = this.clientName ? ' - ' + this.clientName : '';
        const username = this.userName ? ' - ' + this.userName : '';
        const date = this.createDate ? moment(this.createDate).format(' - DD-MM-YY') : moment().format(' - DD-MM-YY');
        return `Facture${username}${client}${date}.pdf`;
    }
}

export enum InvoiceState {
    DRAFT,
    PENDING,
    PAID,
    ABANDONED
}
