import { IModel } from 'app/modules/core';
import { Devis, Invoice } from 'app/models';

export class HistoryEntry implements IModel {
    public static readonly REPO_KEY = 'HistoryEntry';
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public content: string;
    public date: Date;
    public projectId: number;
    public devisId: number;
    public invoiceId: number;
    public type: HistoryEntryType = HistoryEntryType.OTHER;

    constructor() {
        this.date = new Date();
        this.createdAt = new Date();
    }
}

export enum HistoryEntryType {
    OTHER = 'OTHER',
    DEVIS_CREATED = 'DEVIS_CREATED',
    DEVIS_DELETED = 'DEVIS_DELETED',
    DEVIS_DRAFT = 'DEVIS_DRAFT',
    DEVIS_PENDING = 'DEVIS_PENDING',
    DEVIS_ACCEPTED = 'DEVIS_ACCEPTED',
    INVOICE_CREATED = 'INVOICE_CREATED',
    INVOICE_DELETED = 'INVOICE_DELETED',
    INVOICE_DRAFT = 'INVOICE_DRAFT',
    INVOICE_PENDING = 'INVOICE_PENDING',
    INVOICE_PAID = 'INVOICE_PAID',
    INVOICE_ABANDONED = 'INVOICE_ABANDONED',
    TASK_CREATED = 'TASK_CREATED',
    TASK_TODO = 'TASK_TODO',
    TASK_INPROGRESS = 'TASK_INPROGRESS',
    TASK_FINISHED = 'TASK_FINISHED',
    CONTACT_RDV = 'CONTACT_RDV',
    CONTACT_MAIL = 'CONTACT_MAIL',
    CONTACT_PHONE = 'CONTACT_PHONE',
    WORK_TRACKING = 'WORK_TRACKING',
}
