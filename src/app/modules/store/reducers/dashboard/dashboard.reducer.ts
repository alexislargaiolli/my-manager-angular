import { IDashboardState } from '../../store.types';
import { DashboardActions } from './dashboard.actions';

const INITIAL_STATE = {
    waitingDevis: null,
    acceptedDevis: null,
    waitingInvoices: null,
    paidInvoices: null,
    from: null,
    to: null,
    loading: false,
    error: null
};

export function dashboardReducer(state: IDashboardState = INITIAL_STATE, action) {
    switch (action.type) {
        case DashboardActions.LOAD_TOTAL_REQUEST:
            return Object.assign({}, state, { loading: true, error: null, from: action.payload.from, to: action.payload.to });
        case DashboardActions.LOAD_TOTAL_SUCCESS:
            return Object.assign({}, state,
                {
                    loading: false,
                    error: null,
                    waitingDevis: action.payload.data.waitingDevis,
                    acceptedDevis: action.payload.data.acceptedDevis,
                    waitingInvoices: action.payload.data.waitingInvoices,
                    paidInvoices: action.payload.data.paidInvoices,
                    from: action.payload.from,
                    to: action.payload.to
                });
        case DashboardActions.LOAD_TOTAL_ERROR:
            return Object.assign({}, state, { loading: false, error: action.payload });
    }
    return state;
}
