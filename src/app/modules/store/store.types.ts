import { Project, Client, Note, Task, Devis, HistoryEntry, Address, Profile, Invoice } from 'app/models';
import { User, IModelList, IModel, ISessionState } from 'app/modules/core';
import { MyNotification } from '../core/models/my-notification.model';

export interface IAppState {
    profile?: IProfileState;
    dashboard?: IDashboardState;
    projects?: IProjectState;
    session?: ISessionState;
    clients?: IClientState;
    notes?: INoteState;
    projectTasks?: IProjectTaskState;
    projectDevis?: IProjectDevisState;
    projectInvoices?: IProjectInvoiceState;
    projectNotes?: IProjectNoteState;
    projectHistory?: IProjectHistoryState;
    projectClient?: IProjectClientState;
    notifications?: INotificationState;
}

export interface INotificationState {
    items: MyNotification[];
}

export interface IProfileState {
    profile: Profile;
    loading: boolean;
    error: string;
}

export interface IDashboardState {
    waitingDevis: number;
    acceptedDevis: number;
    waitingInvoices: number;
    paidInvoices: number;
    loading: boolean;
    error: string;
}

export interface IProjectState extends IModelList<Project> {
    selectedId?: number;
}

export interface IProjectTaskState extends IModelList<Task> {
    items: Task[];
    loading: boolean;
    error: string;
}

export interface IProjectDevisState extends IModelList<Devis> {
    items: Devis[];
    loading: boolean;
    error: string;
}

export interface IProjectInvoiceState extends IModelList<Invoice> {
    items: Invoice[];
    loading: boolean;
    error: string;
}

export interface IProjectNoteState extends IModelList<Note> {
    items: Note[];
    loading: boolean;
    error: string;
}

export interface IProjectHistoryState extends IModelList<HistoryEntry> {
    items: HistoryEntry[];
    loading: boolean;
    error: string;
}

export interface INoteState extends IModelList<Note> {
    items: Note[];
    loading: boolean;
    error: string;
}

export interface IClientState extends IModelList<Client> {
    items: Client[];
    loading: boolean;
    error: string;
    selectedId: number;
}

export interface IProjectClientState extends IModelList<Client> {
    items: Client[];
    loading: boolean;
    error: string;
}
