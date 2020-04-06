import {
    DASHBOARD_INFO_FETCHED,
    FETCH_DASHBOARD_INFO,

} from "../actions/dashboardPageActions";
import { Action } from "../../common/types/redux";

export default (state = {books: []}, action: Action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_INFO:
            return {...state, ...action.payload, loading: true};
        case DASHBOARD_INFO_FETCHED:
            return {...state, ...action.payload, loading: false};
        default:
            return state
    }
};
