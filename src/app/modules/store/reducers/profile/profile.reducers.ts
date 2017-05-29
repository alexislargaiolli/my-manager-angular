import { IProfileState } from '../../store.types';
import { ProfileActions } from './profile.actions';
import { modelReducer } from '../model/model.reducer';
import { IModelList, ModelUtils, User } from 'app/modules/core';
import { ModelActions } from '../model/model.actions';
import { Address } from 'app/models';

const INITIAL_STATE = {
    profile: null,
    loading: false,
    error: null
};

export function profileReducer(state: IProfileState = INITIAL_STATE, action) {
    switch (action.type) {
        case ProfileActions.LOAD_PROFILE_REQUEST:
            return Object.assign({}, state, { loading: true, error: null });

        case ProfileActions.LOAD_PROFILE_SUCCESS:
            return Object.assign({}, state, { profile: action.payload, loading: false });

        case ProfileActions.LOAD_PROFILE_ERROR:
            return Object.assign({}, state, { profile: null, loading: false, error: action.payload });

        case ProfileActions.UPDATE_PROFILE_SUCCESS:
            return Object.assign({}, state, { profile: action.payload });

        case ProfileActions.UPDATE_PROFILE_ERROR:
            return Object.assign({}, state, { error: action.payload });

    }
    return state;
}
