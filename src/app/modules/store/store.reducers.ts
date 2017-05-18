import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { projectReducer } from './reducers/project/project.reducer';
import { sessionReducer } from '../auth/redux/session/session.reducer';
import { routerReducer } from '@angular-redux/router';
import { selectedProjectReducer } from './reducers/selected-project/selected-project.reducer';
import { projectTaskReducer } from './reducers/project-task/project-task.reducers';
import { IAppState } from 'app/modules/store';
import { projectDevisReducer } from './reducers/project-devis/project-devis.reducers';
import { projectNoteReducer } from './reducers/project-note/project-note.reducers';
import { projectHistoryEntryReducer } from './reducers/project-history/project-history.reducers';

export const reducers = combineReducers<IAppState>({
    projects: projectReducer,
    session: sessionReducer,
    selectedProject: selectedProjectReducer,
    projectTasks: projectTaskReducer,
    projectDevis: projectDevisReducer,
    projectNotes: projectNoteReducer,
    projectHistory: projectHistoryEntryReducer,
    router: routerReducer
});
