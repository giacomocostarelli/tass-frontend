import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Hotel} from './interfaceDB/hotel';
import {Item} from './interfaceDB/item';
import {Alternative} from './interfaceDB/alternative';
import {Room} from './interfaceDB/room';
import {Guest} from './interfaceDB/guest';
import {Router} from '@angular/router';
import {Booking} from './interfaceDB/booking';

@Injectable({providedIn: 'root'})
export class SpringService {

    // private serverUrl = 'http://localhost:8080';
    private serverUrl = 'http://87.8.225.138:8080';

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    // SEARCH
    searchClips(formdata: any): Observable<Map<string, any>> {
        const url = `${this.serverUrl}/hotels/secretSearch`;
        return this.http.post<Map<string, any>>(url, formdata)
            .pipe(
                catchError(this.handleError<Map<string, any>>('getSecretSearch', null))
            );
    }

    normalSearch(formData): Observable<Map<string, any>> {
        const url = `${this.serverUrl}/freeRooms`;
        return this.http.post<Map<string, any>>(url, formData)
            .pipe(
                catchError(this.handleError<Map<string, any>>('standardSearch', null))
            );
    }


    //REGISTER
    register(form: Guest): Observable<Guest> {
        const url = `${this.serverUrl}/guests/register`;
        return this.http.post<Guest>(url, form)
            .pipe(
                catchError(this.handleError<Guest>('postRegisterItem', null))
            );
    }


    // LOGIN
    login(email: string, pwd: string | Int32Array): Observable<Guest> {
        const url = `${this.serverUrl}/guests/login`;
        const param = {email: email, pwd: pwd};
        return this.http.post<Guest>(url, param)
            .pipe(
                catchError(this.handleError<Guest>('guestLogin', null))
            );
    }

    socialLogin(): Observable<number> {
        const url = `${this.serverUrl}/guests/socialLogin`;
        const g = localStorage.getItem('user') as Guest;
        return this.http.post<number>(url, {email: g.email})
            .pipe(
                catchError(this.handleError<number>('socialLogin', null))
            );
    }

    // BOOKINGS
    getBooking(): Observable<Booking[]> {
        const url = `${this.serverUrl}/bookings/`;
        this.httpOptions.headers.append('token_info', localStorage.getItem('token_info'));
        const user = localStorage.getItem('user') as Guest;
        return this.http.get<Booking[]>(url, {params: {id: user.id + ''}})
            .pipe(
                catchError(this.handleError<any>('guestLogin', []))
            );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        // this.router.navigate(['errors/error-500']);
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
