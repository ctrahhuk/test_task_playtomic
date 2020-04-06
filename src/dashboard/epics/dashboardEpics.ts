import { ofType } from 'redux-observable'
import { catchError, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators'
import {
    CANCEL_FETCH_DASHBOARD_INFO, dashboardInfoFetched,
    FETCH_DASHBOARD_INFO
} from "../actions/dashboardPageActions";
import { Observable } from "rxjs/index";

export const fetchDashBoardEpic = (action$, $state) =>
    action$.pipe(
        ofType(FETCH_DASHBOARD_INFO),
        map((action: any) => action.payload),
        switchMap(({firebase}) => {

            // fake server, some random data
            return new Observable((observer) => {
                observer.next([
                    {id: 1, author: "Friedrich Engels", title: "Anti-Dühring"},
                    {id: 2, author: "Stanisław Lem", title: "Summa Technologiae"},
                    {
                        id: 3,
                        author: "Richard Dawkins",
                        title: "The Blind Watchmaker: Why the Evidence of Evolution Reveals a Universe without Design"
                    },
                    {id: 4, author: "David Elieser Deutsch", title: "The Fabric of Reality"},
                ]);
                observer.complete();

            }).pipe(mergeMap(
                (books) => {
                    return [
                        dashboardInfoFetched(books)
                    ];
                }),
                catchError((err) => {
                    return [ dashboardInfoFetched([]) ];
                }),
                takeUntil(action$.pipe(
                    ofType(CANCEL_FETCH_DASHBOARD_INFO)
                ))
            );
        })
    );

