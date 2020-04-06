import { ofType } from 'redux-observable'
import { catchError, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators'
import { FETCH_SETTINGS } from "../actions/settingsPageActions";

export const fetchSettingsEpic = (action$, $state ) =>
    action$.pipe(
        ofType(FETCH_SETTINGS),
        map((action: any) => action.payload),
        switchMap(() => {
            return [
            ];
        })
    );

