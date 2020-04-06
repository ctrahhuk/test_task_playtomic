import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'

import dashboardReducer from "./dashboard/reducers/dashboardReducer";
import settingsReducer from "./settings/reducers/settingsReducer";


export default (history) => {
    return combineReducers({
        router: connectRouter(history),
        dashboard: dashboardReducer,
        settings: settingsReducer,
    });
};
