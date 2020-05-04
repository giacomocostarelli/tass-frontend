import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {City} from '../interfaceDB/city';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SpringService} from '../spring.service';
import {Room} from "../interfaceDB/room";
import {fuseAnimations} from "../../../@fuse/animations";


export interface StateGroup {
    letter: string;
    names: string[];
}


@Component({
    selector: 'ricerca_standard',
    templateUrl: './ricerca-standard.component.html',
    styleUrls: ['./ricerca-standard.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class RicercaStandardComponent implements OnInit {
    form: FormGroup;
    cities: City[] = [{name: 'United States of America'}, {name: 'China'}]; // ...
    stateGroupOptions: Observable<StateGroup[]>;
    returnList: StateGroup[] = [];
    roomList: Room[] = [];
    dataSource =   [{id: 2,	name_hotel: 'hotel2',price:43, num_posti:3,star: 4}];
    displayedColumns = ['id', 'image', 'name_hotel', 'price', 'num_posti', 'star'];

    constructor(
        private _formBuilder: FormBuilder,
        private springService: SpringService,
    ) {
        this.stateGroupOptions = this.sortCity();
    }

    ngOnInit(): void {

        this.form = this._formBuilder.group({
            city: ['', Validators.required],
            personNumber: ['', [Validators.required, Validators.pattern('^[0-9]')]],
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
        // alert(JSON.stringify(this.form.value));
        console.log(this.form.get('arrival').value);

        const date = this.parse(this.form.get('arrival').value);
        const finalDate = date.getDate() + '/' + (1 + date.getMonth())  + '/' + date.getFullYear();
        this.form.get('arrival').setValue(finalDate);
        console.log(this.form.get('arrival').value);


        const date2 = this.parse(this.form.get('departure').value);
        const finalDate2 = date2.getDate() + '/' + (1 + date2.getMonth())  + '/' + date2.getFullYear();
        this.form.get('departure').setValue(finalDate2);
        console.log(this.form.get('departure').value);


        this.springService.normalSearch(this.form.value)
            .subscribe(map => this.roomList = map.get('returnedValue'));
    }

    parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            const str = value.split('/');
            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);
            return new Date(year, month, date);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
}
