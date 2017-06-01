import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { IAppState } from './store.types';
import { reducers } from './store.reducers';
import { ProjectActions } from './reducers/project/project.actions';
import { RootEpics } from './store.epics';
import { ProjectEpics } from './reducers/project/project.epics';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { SelectedProjectActions } from './reducers/selected-project/selected-project.actions';
import { SessionActions } from '../auth/redux/session/session.actions';
import { ProjectTaskActions } from './reducers/project-task/project-task.actions';
import { ProjectTaskEpics } from './reducers/project-task/project-task.epics';
import { SelectedProjectEpics } from './reducers/selected-project/selected-project.epics';
import { ProjectDevisActions } from './reducers/project-devis/project-devis.actions';
import { ProjectDevisEpics } from './reducers/project-devis/project-devis.epics';
import { ProjectNoteEpics } from './reducers/project-note/project-note.epics';
import { ProjectNoteActions } from './reducers/project-note/project-note.actions';
import { ProjectHistoryEntryActions } from './reducers/project-history/project-history.actions';
import { ProjectHistoryEntryEpics } from './reducers/project-history/project-history.epics';
import { NoteActions } from './reducers/note/note.actions';
import { NoteEpics } from './reducers/note/note.epics';
import { ClientEpics } from './reducers/client/client.epics';
import { ClientActions } from './reducers/client/client.actions';
import { ProjectClientActions } from './reducers/project-client/project-client.actions';
import { ProjectClientEpics } from './reducers/project-client/project-client.epics';
import { ProfileActions } from './reducers/profile/profile.actions';
import { ProfileEpics } from './reducers/profile/profile.epics';
import { DashboardActions } from './reducers/dashboard/dashboard.actions';
import { DashboardEpics } from './reducers/dashboard/dashboard.epics';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    NgReduxRouterModule
  ],
  declarations: [

  ],
  providers: [
    RootEpics,
    ProjectActions,
    ProjectEpics,
    NoteActions,
    NoteEpics,
    SelectedProjectActions,
    SelectedProjectEpics,
    ProjectTaskActions,
    ProjectTaskEpics,
    ProjectDevisActions,
    ProjectDevisEpics,
    ProjectTaskActions,
    ProjectNoteActions,
    ProjectNoteEpics,
    ProjectHistoryEntryActions,
    ProjectHistoryEntryEpics,
    ProjectClientActions,
    ProjectClientEpics,
    ClientActions,
    ClientEpics,
    ProfileActions,
    ProfileEpics,
    DashboardActions,
    DashboardEpics
  ]
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    private _rootEpics: RootEpics
  ) {
    store.configureStore(
      reducers,
      {},
      [
        // createLogger(),
        this._rootEpics.createEpics()
      ],
      devTools.isEnabled() ? [devTools.enhancer()] : []
    );

    ngReduxRouter.initialize();
  }
}
