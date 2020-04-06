export const FETCH_DASHBOARD_INFO = 'FETCH_DASHBOARD_INFO';
export const DASHBOARD_INFO_FETCHED = 'DASHBOARD_INFO_FETCHED';
export const CANCEL_FETCH_DASHBOARD_INFO = 'CANCEL_FETCH_DASHBOARD_INFO';

export const fetchDashboardInfo = (firebase) => ({
    type: FETCH_DASHBOARD_INFO,
    payload: {firebase}
});

export const dashboardInfoFetched = (books) => ({
    type: DASHBOARD_INFO_FETCHED,
    payload: {books}
});

export const cancelDashboardInfoFetch = () => ({
    type: CANCEL_FETCH_DASHBOARD_INFO,
    payload: {}
});