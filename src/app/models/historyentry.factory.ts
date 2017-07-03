import { IModel } from 'app/modules/core';
import { Devis, Invoice, DevisState, InvoiceState, Task, TaskState } from 'app/models';
import { HistoryEntryType, HistoryEntry } from './historyentry.model';

export class HistoryEntryFactory {

    public static devisCreated(devis: Devis): HistoryEntry {
        const entry = HistoryEntryFactory.create(devis.projectId, 'Nouveau devis', devis.title, HistoryEntryType.DEVIS_CREATED);
        entry.devisId = devis.id;
        return entry;
    }

    public static devisDeleted(devis: Devis): HistoryEntry {
        return HistoryEntryFactory.create(devis.projectId, 'Devis supprimé', devis.title, HistoryEntryType.DEVIS_DELETED);
    }

    public static devisStateUpdated(devis: Devis): HistoryEntry {
        let entry = null;
        switch (devis.state) {
            case DevisState.DRAFT:
                entry = HistoryEntryFactory.create(devis.projectId, 'Devis brouillon', devis.title, HistoryEntryType.DEVIS_DRAFT);
                break;
            case DevisState.PENDING:
                entry = HistoryEntryFactory.create(devis.projectId, 'Devis en attente', devis.title, HistoryEntryType.DEVIS_PENDING);
                break;
            case DevisState.ACCEPTED:
                entry = HistoryEntryFactory.create(devis.projectId, 'Devis accepté', devis.title, HistoryEntryType.DEVIS_ACCEPTED);
                break;
        }
        entry.devisId = devis.id;
        return entry;
    }

    public static invoiceCreated(invoice: Invoice): HistoryEntry {
        const entry = HistoryEntryFactory.create(invoice.projectId, 'Nouvelle facture', invoice.title, HistoryEntryType.INVOICE_CREATED);
        entry.invoiceId = invoice.id;
        return entry;
    }

    public static invoiceDeleted(invoice: Invoice): HistoryEntry {
        return HistoryEntryFactory.create(invoice.projectId, 'Facture supprimée', invoice.title, HistoryEntryType.INVOICE_DELETED);
    }

    public static invoiceStateUpdated(invoice: Invoice): HistoryEntry {
        let entry = null;
        switch (invoice.state) {
            case InvoiceState.DRAFT:
                entry = HistoryEntryFactory.create(invoice.projectId, 'Facture brouillon', invoice.title, HistoryEntryType.INVOICE_DRAFT);
                break;
            case InvoiceState.PENDING:
                entry = HistoryEntryFactory.create(invoice.projectId, 'Facture en attente', invoice.title, HistoryEntryType.INVOICE_PENDING);
                break;
            case InvoiceState.PAID:
                entry = HistoryEntryFactory.create(invoice.projectId, 'Facture payée', invoice.title, HistoryEntryType.INVOICE_PAID);
                break;
            case InvoiceState.ABANDONED:
                entry = HistoryEntryFactory.create(invoice.projectId, 'Facture abandonnée', invoice.title, HistoryEntryType.INVOICE_ABANDONED);
                break;
        }
        entry.invoiceId = invoice.id;
        return entry;
    }

    public static createdTask(task: Task): HistoryEntry {
        return HistoryEntryFactory.create(task.projectId, 'Nouvelle tâche', task.title, HistoryEntryType.TASK_CREATED);
    }

    public static taskStateChanged(task: Task): HistoryEntry {
        let entry = HistoryEntryFactory.create(task.projectId, 'Tâche en cours', task.title, HistoryEntryType.TASK_INPROGRESS);
        switch (task.state) {
            case TaskState.TODO:
                entry.title = 'Tâche à faire';
                entry.type = HistoryEntryType.TASK_TODO;
                break;
            case TaskState.IN_PROGRESS:
                entry.title = 'Tâche en cours';
                entry.type = HistoryEntryType.TASK_INPROGRESS;
                break;
            case TaskState.FINISHED:
                entry.title = 'Tâche terminée';
                entry.type = HistoryEntryType.TASK_FINISHED;
                break;
        }
        return entry;
    }

    private static create(projectId: number, title: string, content: string, type: HistoryEntryType): HistoryEntry {
        const entry = new HistoryEntry();
        entry.title = title;
        entry.content = content;
        entry.projectId = projectId;
        entry.type = type;
        return entry;
    }

}
