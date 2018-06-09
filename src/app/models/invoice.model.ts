import { Client } from './client.model';
import { Profile } from './profile.model';
import { DevisLine, Devis } from './devis.model';
import { IModel } from 'app/modules/core';
import { Address } from './address.model';
import * as moment from 'moment';

export class Invoice implements IModel {
    public static readonly REPO_KEY = 'Invoice';
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public createDate: Date;
    public validityDate: Date;
    public invoiceId: string;
    public projectId: number;
    public title: string;
    public siret: string;
    public tvaIntra: string;
    public tvaActive: boolean;
    public totalPrice: number;
    public totalTVA: number;
    public totalNet: number;
    public paidDate: Date;
    public state: InvoiceState = InvoiceState.DRAFT;
    public clientName: string;
    public userName: string;
    public userPhone: string;
    public userMail: string;
    public clientAddress: Address;
    public userAddress: Address;
    public lines: DevisLine[];
    public declared: boolean;

    constructor() {
        this.userAddress = new Address();
        this.clientAddress = new Address();
        this.lines = [];
        this.state = InvoiceState.DRAFT;
        this.createDate = new Date();
        this.validityDate = moment().add(1, 'month').toDate();
        this.totalPrice = 0;
        this.totalTVA = 0;
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
        if (this.tvaActive) {
            this.totalTVA = Number((this.totalPrice * 0.2).toFixed(2));
        } else {
            this.totalTVA = 0;
        }
        this.totalNet = this.totalPrice + this.totalTVA;
    }

    public importProfile(profile: Profile) {
        if (profile.addresses != null && profile.addresses.length > 0) {
            this.userAddress = profile.addresses[0];
        }
        this.userName = `${profile.firstname}  ${profile.lastname}`;
        this.siret = profile.siret;
        this.tvaIntra = profile.tvaIntra;
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
