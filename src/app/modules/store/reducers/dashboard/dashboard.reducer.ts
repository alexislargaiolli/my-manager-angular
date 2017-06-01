import { IDashboardState } from '../../store.types';
import { DashboardActions } from './dashboard.actions';

const INITIAL_STATE = {
    paid: null,
    invoiced: null,
    potential: null,
    loading: false,
    error: null
};

export function dashboardReducer(state: IDashboardState = INITIAL_STATE, action) {
    switch (action.type) {
        case DashboardActions.LOAD_TOTAL_REQUEST:
            return Object.assign({}, state, { loading: true, error: null });
        case DashboardActions.LOAD_TOTAL_SUCCESS:
            return Object.assign({}, state,
                {
                    loading: false,
                    error: null,
                    paid: action.payload.paid,
                    invoiced: action.payload.invoiced,
                    potential: action.payload.potential
                });
        case DashboardActions.LOAD_TOTAL_ERROR:
            return Object.assign({}, state, { loading: false, error: action.payload });
    }
    return state;
}
