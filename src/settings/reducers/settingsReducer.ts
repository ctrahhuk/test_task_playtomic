import { Action } from "../../common/types/redux";
import { FETCH_SETTINGS } from "../actions/settingsPageActions";

export default (state = {books: []}, action: Action) => {
    switch (action.type) {
        case FETCH_SETTINGS:
            return {...state};
        default:
            return state
    }
};
