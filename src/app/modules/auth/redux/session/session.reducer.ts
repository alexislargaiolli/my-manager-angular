import { UserSession } from 'app/modules/core';
import { SessionActions } from './session.actions';

const INITIAL_STATE: UserSession = {
    user: null,
    userId: null,
    token: null,
    logging_in: false,
    logging_out: false,
    authenticated: false,
    gettingUserInfo: false,
    error: null
}

export function sessionReducer(state: UserSession = Object.assign({}, INITIAL_STATE), action) {

    switch (action.type) {
        case SessionActions.LOGIN_REQUEST: {
            return Object.assign({}, state, { logging_in: true, error: null });
        }
        case SessionActions.LOGIN_SUCCESS: {
            return Object.assign({}, state, { authenticated: true, logging_in: false, userId: action.payload.userId, token: action.payload.token, error: null });
        }
        case SessionActions.LOGIN_ERROR: {
            return Object.assign({}, state, { authenticated: false, logging_in: false, error: action.payload });
        }
        case SessionActions.LOGOUT_REQUEST: {
            return Object.assign({}, state, { logging_out: true, error: null });
        }
        case SessionActions.LOGOUT_SUCCESS: {
            return Object.assign({}, INITIAL_STATE);
        }
        case SessionActions.LOGOUT_ERROR: {
            return Object.assign({}, state, { logging_out: false, error: action.payload });
        }
        case SessionActions.USER_INFO_REQUEST: {
            return Object.assign({}, state, { gettingUserInfo: true, error: null });
        }
        case SessionActions.USER_INFO_SUCCESS: {
            return Object.assign({}, state, { user: action.payload, gettingUserInfo: false, error: null });
        }
        case SessionActions.USER_INFO_ERROR: {
            return Object.assign({}, state, { error: action.payload, gettingUserInfo: false });
        }
    }

    return state;
}
