import { ISessionState } from 'app/modules/core';
import { SessionActions } from './session.actions';

const INITIAL_STATE: ISessionState = {
    userId: null,
    token: null,
    logging_in: false,
    logging_out: false,
    authenticated: false,
    gettingUserInfo: false,
    error: null,
    register: {
        registering: false,
        registered: false,
        error: null
    }
}

export function sessionReducer(state: ISessionState = Object.assign({}, INITIAL_STATE), action) {

    switch (action.type) {
        case SessionActions.LOGIN_REQUEST:
            return Object.assign({}, state, { logging_in: true, error: null });

        case SessionActions.LOGIN_SUCCESS:
            return Object.assign({}, state, { authenticated: true, logging_in: false, userId: action.payload.userId, token: action.payload.token, error: null });

        case SessionActions.LOGIN_ERROR:
            return Object.assign({}, state, { authenticated: false, logging_in: false, error: action.payload });

        case SessionActions.LOGOUT_REQUEST:
            return Object.assign({}, state, { logging_out: true, error: null });

        case SessionActions.LOGOUT_SUCCESS:
            return Object.assign({}, INITIAL_STATE);

        case SessionActions.LOGOUT_ERROR:
            return Object.assign({}, state, { logging_out: false, error: action.payload });

        case SessionActions.REGISTER_REQUEST:
            return Object.assign({}, state, { register: { registering: true, registered: false, error: null } });

        case SessionActions.REGISTER_SUCCESS:
            return Object.assign({}, state, { register: { registering: false, registered: true, error: null } });

        case SessionActions.REGISTER_ERROR:
            return Object.assign({}, state, { register: { registering: false, registered: false, error: action.payload } });
    }

    return state;
}
