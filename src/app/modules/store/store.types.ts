import { Project, Client, Note, Task, Devis, HistoryEntry, Address, Profile } from 'app/models';
import { User, IModelList, IModel, UserSession } from 'app/modules/core';

export interface IAppState {
    profile?: IProfileState,
    projects?: IModelList<Project>,
    session?: UserSession,
    clients?: IClientState;
    notes?: INoteState;
    selectedProject?: ISelectedProjectState,
    projectTasks?: IProjectTaskState,
    projectDevis?: IProjectDevisState,
    projectNotes?: IProjectNoteState,
    projectHistory?: IProjectHistoryState,
    projectClient?: IProjectClientState
}

export interface IProfileState {
    profile: Profile,
    loading: boolean,
    error: string
}

export interface ISelectedProjectState {
    id: number
}

export interface IProjectTaskState extends IModelList<Task> {
    items: Task[],
    loading: boolean,
    error: string
}

export interface IProjectDevisState extends IModelList<Devis> {
    items: Devis[],
    loading: boolean,
    error: string
}

export interface IProjectNoteState extends IModelList<Note> {
    items: Note[],
    loading: boolean,
    error: string
}

export interface IProjectHistoryState extends IModelList<HistoryEntry> {
    items: HistoryEntry[],
    loading: boolean,
    error: string
}

export interface INoteState extends IModelList<Note> {
    items: Note[],
    loading: boolean,
    error: string
}

export interface IClientState extends IModelList<Client> {
    items: Client[],
    loading: boolean,
    error: string,
    selectedId: number
}

export interface IProjectClientState extends IModelList<Client> {
    items: Client[],
    loading: boolean,
    error: string
}
