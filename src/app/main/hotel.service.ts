import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {City} from './interfaceDB/city';
import {catchError, map} from "rxjs/operators";



export const REGIONS: string[] = ['Abruzzo', 'Basilicata', 'Calabria', 'Campania',
    'Emilia Romagna', 'Friuli Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
    'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino Alto Adige', 'Umbria',
    'Valle d\'Aosta', 'Veneto'];


export interface StateGroup {
    letter: string;
    names: string[];
}



@Injectable({providedIn: 'root'})
export class HotelService{

    // private serverUrl = 'http://localhost:8080';
    private serverUrl = 'http://87.8.225.138:8080';
    returnList: StateGroup[] = [];
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };


    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    getCity(): Observable<Map<string, any>> {
       /* const cities: City[] = [{name: 'Cagliari'}, {name: 'China'}];
        return of(cities);*/
        const url = `${this.serverUrl}/cities`;
        return this.http.get<Map<string, any>>(url)
            .pipe(
                catchError(this.handleError<Map<string, any>>('getCities', null))
            );
    }

    getSortedCity(): Observable<StateGroup[]>{
        this.getCity().subscribe((res) => this.sortCity(res['returnedValue']));
        return of(this.returnList);
    }

    private sortCity(cities: City[]): void {
        cities.sort((one, two) => (one.name > two.name ? 1 : -1));
        let thisLetter = 'A';
        let citySameLetter: string[] = [];
        for (const c of cities) {
            if (c.name[0].toUpperCase() !== thisLetter) {
                if (citySameLetter.length > 0) {
                    this.returnList.push({letter: thisLetter, names: citySameLetter});
                    citySameLetter = [];
                }
                thisLetter = c.name[0].toUpperCase();
            }
            citySameLetter.push(c.name);
        }
        this.returnList.push({letter: thisLetter, names: citySameLetter});
    }


    /*getAllHotels(): Observable<Hotel[]> {
        const url = `${this.serverUrl}/hotels`;
        return this.http.get<Hotel[]>(url)
            .pipe(
                catchError(this.handleError<Hotel[]>('getAllHotels', []))
            );
    }*/


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
