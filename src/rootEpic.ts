import { combineEpics } from 'redux-observable'
import dashboardEpics from './dashboard/epics'
import settingsEpics from './settings/epics'


export default combineEpics(
    ...dashboardEpics as any,
    ...settingsEpics as any,
)
