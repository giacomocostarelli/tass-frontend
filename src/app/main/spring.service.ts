import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
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
     private serverUrl = 'http://79.45.169.129:8080';

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        params: new HttpParams()
    };

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    // SEARCH
    searchClips(formdata: any): Observable<Alternative[]> {
        const url = `${this.serverUrl}/hotels/secretSearch`;
        return this.http.post<Alternative[]>(url, formdata)
            .pipe(
                catchError(this.handleError<Alternative[]>('getSecretSearch', null))
            );
    }
    normalSearch(formData): Observable<Room[]> {
        const url = `${this.serverUrl}/hotels/freeRooms`;
        return this.http.post<Room[]>(url, formData)
            .pipe(
                catchError(this.handleError<Room[]>('standardSearch', null))
            );
    }


    //REGISTER
    register(form: Guest): Observable<string> {
        const url = `${this.serverUrl}/guests/register`;
        return this.http.post<string>(url, form)
            .pipe(
                catchError(this.handleError<string>('postRegisterItem', 'failed registration'))
            );
    }


    // LOGIN
    login(email: string, pwd: string | Int32Array): Observable<any> {
        const url = `${this.serverUrl}/guests/login`;
        const param = {email: email, pwd: pwd};
        return this.http.post<any>(url, param)
            .pipe(
                catchError(this.handleError<any>('guestLogin', null))
            );
    }

    socialLogin(): Observable<number> { // da modificare perchè non torna l'id
        const url = `${this.serverUrl}/guests/socialLogin`;
        const g = localStorage.getItem('user') as Guest;
        return this.http.post<number>(url, g)
            .pipe(
                catchError(this.handleError<number>('socialLogin', null))
            );
    }

    // BOOKINGS
    getBooking(): Observable<Booking[]> {
        const user = JSON.parse(localStorage.getItem('user')) as Guest;
        const url = `${this.serverUrl}/bookings/${JSON.stringify(user.id)}`;
        const token = localStorage.getItem('token_info');
        const headers = new HttpHeaders({'token_info': token});

        return this.http.get<Booking[]>(url, {headers: headers})
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
        return (error: HttpErrorResponse): Observable<T> => {
            console.log('ERRORERERERERE: ' + JSON.stringify(error)); // log to console instead
            if (error.status === 401){
                alert('ritenta sarai più fortunato'); // da sistemare, gestire quando fallisce token, quando user non esiste o quando pwd è sbagliata
                this.router.navigate(['/login']);
                return;
            }
            if (error.status === 500) {
                this.router.navigate(['errors/error-500']);
                return;
            }

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
