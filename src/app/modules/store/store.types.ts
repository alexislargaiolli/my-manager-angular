import { Project, Client, Note, Task, Devis, HistoryEntry } from 'app/models';
import { User, IModelList, IModel, UserSession } from 'app/modules/core';

export interface IAppState {
    projects?: IModelList<Project>;
    session?: UserSession,
    // clients?: IModelList<Client>;
    // notes?: IModelList<Note>;
    // selectedProject?: {
    //     project: Project;
    //     tasks?: IModelList<Task>;
    //     devis?: IModelList<Devis>;
    //     history?: IModelList<HistoryEntry>;
    //     notes?: IModelList<Note>;
    // }
}
