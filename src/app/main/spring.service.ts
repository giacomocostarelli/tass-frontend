import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Hotel} from './interfaceDB/hotel';
import {Item} from './interfaceDB/item';
import {Alternative} from './interfaceDB/alternative';
import {Room} from './interfaceDB/room';
import {Guest} from './interfaceDB/guest';

@Injectable({providedIn: 'root'})
export class SpringService {

    private serverUrl = 'http://localhost:8080';
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http: HttpClient) {
    }

    getAllHotels(): Observable<Hotel[]> {
        const url = `${this.serverUrl}/hotels`;
        return this.http.get<Hotel[]>(url)
            .pipe(
                catchError(this.handleError<Hotel[]>('getAllHotels', []))
            );
    }

    createNewItem(i: Item): Observable<Item> {
        const url = `${this.serverUrl}/items/register`;
        // const i2: Map<string, string>[];
        // const lol = {name: "blablabla"};
        return this.http.post<Item>(url, i)
            .pipe(
                catchError(this.handleError<Item>('postRegisterItem', null))
            );
    }

    searchClips(Cities: { city: string, region: string }[], Days: number, MaxBudget: string, People: number,
                OnlyRegion: string, OnlyNotRegion: string, MaxStars: number, MinStars: number,
                TourismType: string[], Arrival: string, Departure: string): Observable<Alternative[]> {
        const secretSearch = {
            cities: Cities, days: Days, maxBudget: MaxBudget, people: People,
            onlyRegion: OnlyRegion, onlyNotRegion: OnlyNotRegion, maxStars: MaxStars, minStars: MinStars,
            tourismTypes: TourismType, arrival: Arrival, departure: Departure
        };
        const url = `${this.serverUrl}/prova`;
        return this.http.post<Alternative[]>(url, secretSearch)
            .pipe(
                catchError(this.handleError<Alternative[]>('postRegisterItem', []))
            );
    }

    normalSearch(city: string, arrival: string, departure: string): Observable<Room[]> {
        const url = `${this.serverUrl}/search`;
        return this.http.post<Room[]>(url, {city, arrival, departure})
            .pipe(
                catchError(this.handleError<Room[]>('postRegisterItem', []))
            );
    }

    register(name: string, user: string, email: string, pwd: string | Int32Array): Observable<Guest> {
        const url = `http://87.8.225.138:8080/guests/register`;
        const guest = {email: email, name: name, pwd: pwd, username: user};
        return this.http.post<Guest>(url, guest)
            .pipe(
                catchError(this.handleError<Guest>('postRegisterItem', null))
            );
    }

    login(email: string, pwd: string | Int32Array): Observable<Guest> {
        const url =  `http://87.8.225.138:8080/guests/login`;
        const param = {email: email, pwd: pwd};
        return this.http.post<Guest>(url, param)
            .pipe(
                catchError(this.handleError<Guest>('guestLogin', null))
        );
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
