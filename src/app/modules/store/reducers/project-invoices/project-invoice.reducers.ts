import { IProjectInvoiceState } from '../../store.types';
import { ProjectInvoiceActions } from './project-invoice.actions';
import { Invoice } from 'app/models';
import { modelReducer } from '../model/model.reducer';
import { IModelList } from 'app/modules/core';

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null
};

export function projectInvoiceReducer(state: IProjectInvoiceState = INITIAL_STATE, action) {
    state = modelReducer<Invoice>(Invoice.REPO_KEY, Invoice.REPO_KEY, state, action);
    return state;
}
