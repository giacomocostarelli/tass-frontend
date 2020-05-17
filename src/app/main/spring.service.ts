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
import {Booking} from "./interfaceDB/booking";

@Injectable({providedIn: 'root'})
export class SpringService {

    // private serverUrl = 'http://localhost:8080';
    private serverUrl = 'http://87.8.225.138:8080';

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    /*Cities: { city: string, region: string }[], Days: number, MaxBudget: string, People: number,
                OnlyRegion: string, OnlyNotRegion: string, MaxStars: number, MinStars: number,
                TourismType: string[], Arrival: string, Departure: string*/
    searchClips(formdata: any): Observable<Map<string, any>> {
        /* const secretSearch = {
             cities: Cities, days: Days, maxBudget: MaxBudget, people: People,
             onlyRegion: OnlyRegion, onlyNotRegion: OnlyNotRegion, maxStars: MaxStars, minStars: MinStars,
             tourismTypes: TourismType, arrival: Arrival, departure: Departure
         };*/
        const url = `${this.serverUrl}/secretSearch`;
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

    register(form: Guest): Observable<Guest> {
        const url = `${this.serverUrl}/guests/register`;
        return this.http.post<Guest>(url, form)
            .pipe(
                catchError(this.handleError<Guest>('postRegisterItem', null))
            );
    }

    login(email: string, pwd: string | Int32Array): Observable<Guest> {
        const url = `${this.serverUrl}/guests/login`;
        const param = {email: email, pwd: pwd};
        return this.http.post<Guest>(url, param)
            .pipe(
                catchError(this.handleError<Guest>('guestLogin', null))
            );
    }

    loginGoogle(googleUser: any): Observable<any> {
        const url = `${this.serverUrl}/guests/setAuthentication`;
        return this.http.post<any>(url, googleUser)
            .pipe(
                catchError(this.handleError<any>('guestLogin', null))
            );
    }

    loginFacebook(facebookAuthentication: any): Observable<any> {
        const url = `${this.serverUrl}/guests/???`; // da cambiare
        return this.http.post<any>(url, facebookAuthentication)
            .pipe(
                catchError(this.handleError<any>('guestLogin', null))
            );
    }

    getBooking(): Observable<Booking[]> {
        const url = `${this.serverUrl}/bookings`;
        return this.http.get<Booking[]>(url)
            .pipe(
                catchError(this.handleError<any>('guestLogin', null))
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
