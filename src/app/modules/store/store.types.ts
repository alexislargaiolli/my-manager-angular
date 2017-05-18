import { Project, Client, Note, Task, Devis, HistoryEntry } from 'app/models';
import { User, IModelList, IModel, UserSession } from 'app/modules/core';

export interface IAppState {
    projects?: IModelList<Project>,
    session?: UserSession,
    // clients?: IModelList<Client>;
    // notes?: IModelList<Note>;
    selectedProject?: ISelectedProjectState,
    projectTasks?: IProjectTaskState,
    projectDevis?: IModelList<Devis>,
    projectNotes?: IProjectNoteState,
    projectHistory?: IModelList<HistoryEntry>
    //     project: Project;
    //     tasks?: IModelList<Task>;
    //     devis?: IModelList<Devis>;
    //     history?: IModelList<HistoryEntry>;
    //     notes?: IModelList<Note>;
    // }
}

export interface ISelectedProjectState {
    id: number
}

export interface IProjectTaskState {
    items: Task[],
    loading: boolean,
    error: string
}

export interface IProjectDevisState {
    items: Task[],
    loading: boolean,
    error: string
}

export interface IProjectNoteState {
    items: Note[],
    loading: boolean,
    error: string
}
