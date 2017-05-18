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
    ProjectHistoryEntryEpics
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
