import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { projectReducer } from './reducers/project/project.reducer';
import { sessionReducer } from '../auth/redux/session/session.reducer';
export const reducers = combineReducers({
    projects: projectReducer,
    session: sessionReducer
});
