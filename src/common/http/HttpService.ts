import { AxiosError, AxiosResponse } from "axios";
import Axios from "axios-observable";
import { AxiosObservable } from "axios-observable/dist/axios-observable.interface";
import { Observable, ObservableInput, throwError } from "rxjs/index";
import { catchError, map } from "rxjs/internal/operators";


export class HttpService {

    public static get<T>(url, params?, headers?, data?): Observable<T> {
        return this.getResponse(Axios.get<T>(this.getFullUrl(url),
            {headers: {...HttpService.getHeaders(), ...headers},
                params,
                data
            }));
    }

    public static post<T>(url, data?, params?, headers?): Observable<T> {
        return this.getResponse(Axios.post<T>(this.getFullUrl(url), data,
            {headers: {...HttpService.getHeaders(), ...headers}, params}));
    }

    public static getHeaders() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "",
        };
    }

    private static getFullUrl(url: string): string {
        return `${process.env.REACT_APP_SERVER_URL}/${url}`;
    }

    private static getResponse<T>(observable: AxiosObservable<T>): Observable<T> {
        return observable.pipe(
            map((response: AxiosResponse<T>) => {
                return response.data;
            }),
            catchError((err: AxiosError, caught: Observable<T>): ObservableInput<T> =>
                     throwError({
                        status: err.response ? err.response.status : "",
                        message: err.response && err.response.data.error && err.response.data.error ? err.response.data.error.message : "",
                    }),
            ),
        ) as any;
    }

}
