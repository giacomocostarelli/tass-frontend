import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {City} from '../interfaceDB/city';
import {Observable, of} from 'rxjs';
import {SpringService} from '../spring.service';


export interface StateGroup {
    letter: string;
    names: string[];
}

@Component({
    selector: 'ricerca_standard',
    templateUrl: './ricerca-standard.component.html',
    styleUrls: ['./ricerca-standard.component.scss']
})
export class RicercaStandardComponent implements OnInit {
    form: FormGroup;
    cities: City[] = [{name: 'United States of America'}, {name: 'China'}]; // ...
    stateGroupOptions: Observable<StateGroup[]>;
    returnList: StateGroup[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private springService: SpringService
    ) {
        this.stateGroupOptions = this.sortCity();
    }

    ngOnInit(): void {

        this.form = this._formBuilder.group({
            city: ['', Validators.required],
            personNumber: ['', Validators.required],
            arrival: ['', Validators.required],
            departure: ['', Validators.required]
        });
    }

    sortCity(): Observable<StateGroup[]> {
        this.cities.sort((one, two) => (one.name > two.name ? 1 : -1));
        let thisLetter = 'A';
        let citySameLetter: string[] = [];
        for (const c of this.cities) {
            const city = c.name;
            if (city[0].toUpperCase() !== thisLetter) {
                if (citySameLetter.length > 0) {
                    this.returnList.push({letter: thisLetter, names: citySameLetter});
                    citySameLetter = [];
                }
                thisLetter = city[0].toUpperCase();
            }
            citySameLetter.push(city);
        }
        this.returnList.push({letter: thisLetter, names: citySameLetter});
        return of(this.returnList);
    }


    // PROBLEMI: prende le città anche se non fan parte della lista
    // il numero di persone viene preso solo dopo aver compilato correttamente un altro campo ???
    onFormSubmit(): void {
        alert(JSON.stringify(this.form.value));
        /*this.springService.normalSearch(this.form.value)
            .subscribe(boh => console.log(JSON.stringify(boh)) );*/
    }
}
