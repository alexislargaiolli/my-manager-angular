import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { IAppState } from './store.types';
import { reducers } from './store.reducers';
import { ProjectActions } from './reducers/project/project.actions';
import { RootEpics } from './store.epics';
import { ProjectEpics } from './reducers/project/project.epics';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule
  ],
  declarations: [

  ],
  providers: [
    RootEpics,
    ProjectActions,
    ProjectEpics
  ]
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    private _rootEpics: RootEpics
  ) {
    store.configureStore(
      reducers,
      {},
      [createLogger(), this._rootEpics.createEpics()],
      devTools.isEnabled() ? [devTools.enhancer()] : []
    );
  }
}
