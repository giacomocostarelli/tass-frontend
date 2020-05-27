import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {City} from './interfaceDB/city';
import {catchError, map} from 'rxjs/operators';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export const REGIONS: string[] = ['Abruzzo', 'Basilicata', 'Calabria', 'Campania',
    'Emilia Romagna', 'Friuli Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
    'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino Alto Adige', 'Umbria',
    'Valle d\'Aosta', 'Veneto'];


export interface StateGroup {
    letter: string;
    names: string[];
}

@Injectable({providedIn: 'root'})
export class CityService {

    // private serverUrl = 'http://localhost:8080';
    private serverUrl = 'http://82.54.103.107:8080';
    sortedCity: StateGroup[] = [];
    cityRegion: Map<string, string> = new Map();
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };


    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    getCity(): Observable<City[]> {
        const url = `${this.serverUrl}/hotels/cities`;
        return this.http.get<City[]>(url)
            .pipe(
                catchError(this.handleError<City[]>('getCities', []))
            );
    }

    getSortedCity(updatelist: boolean = true): Observable<StateGroup[]> {
        /*this.sortCity([{name: 'Cagliari'}, {name: 'China'}]);
        return of(this.sortedCity);*/
        if (updatelist === false) {
            return of(this.sortedCity);
        }
        this.getCity().subscribe((res) => this.sortCity(res));
        return of(this.sortedCity);
    }

    private sortCity(cities: City[]): void {
        this.sortedCity.length = 0;
        cities.sort((one, two) => (one.name > two.name ? 1 : -1));
        let thisLetter = 'A';
        let citySameLetter: string[] = [];
        for (const c of cities) {
            this.cityRegion.set(c.name, c.region);
            if (c.name[0].toUpperCase() !== thisLetter) {
                if (citySameLetter.length > 0) {
                    this.sortedCity.push({letter: thisLetter, names: citySameLetter});
                    citySameLetter = [];
                }
                thisLetter = c.name[0].toUpperCase();
            }
            citySameLetter.push(c.name);
        }
        this.sortedCity.push({letter: thisLetter, names: citySameLetter});
    }

    getRegion(city: string): string {
        return this.cityRegion.get(city);
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
    private handleError<T>(operation = 'operation', result?: T): any {
        // this.router.navigate(['errors/error-500']);
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}

export class CityValidator {

    static checkCity(_cityService: CityService): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            let listCityGroup: StateGroup[] = [];
            _cityService.getSortedCity(false).subscribe(
                (value: StateGroup[]) => listCityGroup = value);
            let exist = false;
            if (control.value === '') {
                return null;
            }
            listCityGroup.forEach(value => {
                if (value.letter === control.value[0].toUpperCase() && value.names.indexOf(control.value) >= 0) {
                    exist = true;
                }
            });
            return exist ? null : {'checkCity': true};
        };
    }
}
