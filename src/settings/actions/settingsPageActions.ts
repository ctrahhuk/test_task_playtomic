export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const CANCEL_FETCH_SETTINGS_INFO = 'CANCEL_FETCH_SETTINGS_INFO';

export const fetchSettings = () => ({
    type: FETCH_SETTINGS,
    payload: {}
});

export const cancelFetchSettings = () => ({
    type: CANCEL_FETCH_SETTINGS_INFO,
    payload: {}
});