import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../interfaceDB/city';
import {Observable, of} from 'rxjs';
import {SpringService} from '../../spring.service';
import {MatCheckboxChange} from "@angular/material/checkbox";


export interface StateGroup {
    letter: string;
    names: string[];
}


@Component({
    selector: 'form-secret-places',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    starOne: string[] = ['1', '2', '3', '4', '5'];
    starTwo: string[] = ['1', '2', '3', '4', '5'];
    tourismTypes: string[] = ['balneare', 'montano', 'lacustre', 'naturalistico', 'culturale', 'termale', 'religioso', 'sportivo', 'enogastronomico'];
    cities: City[] = [{name: 'Cagliari'}, {name: 'China'}]; // ...
    cityInputs = [1];
    form: FormGroup;
    stateGroupOptions: Observable<StateGroup[]>;
    returnList: StateGroup[] = [];

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private springService: SpringService
    ) {
    }


    ngOnInit(): void {
        // VALIDATOR MANCANTI: DATA ARRIVO < DATA RITORNO, CITTA IN LISTA CITTA, MINSTAR < MAXSTAR
        this.form = new FormGroup({
            cities: new FormArray([], ),
            maxBudget: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*')]),
            people: new FormControl('', [Validators.required, Validators.pattern('^[0-9]')]),
            onlyRegion: new FormControl('', ),
            onlyNotRegion: new FormControl('', ),
            minStars: new FormControl(1, ),
            maxStars: new FormControl(5, ),
            tourismTypes: new FormArray([], ),
            arr: new FormControl('', Validators.required),
            arrival: new FormControl('', ),
            dep: new FormControl('', Validators.required),
            departure: new FormControl('', )
        });
        this.stateGroupOptions = this.sortCity();
        this.form.controls['arr'].valueChanges.subscribe( arr => { this.setFinalDate('arrival', arr); });
        this.form.controls['dep'].valueChanges.subscribe( dep => { this.setFinalDate('departure', dep); });


    }
    private setFinalDate(param: string, value: any): void{
        const date = this.parse(value);
        const finalDate = date.getDate() + '/' + (1 + date.getMonth())  + '/' + date.getFullYear();
        this.form.controls[param].setValue(finalDate);
    }


    public generateRowIndexes(count: number): Array<number> {
        const indexes = [];
        for (let i = 0; i < count; i++) {
            indexes.push(i);
        }
        return indexes;
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper(): void {

        alert(JSON.stringify(this.form.value));
        //this.springService.searchClips(this.form.value)
            //.subscribe(alternative => console.log(JSON.stringify(alternative)));
    }

    onCheckChange(event: MatCheckboxChange): void {

        const formArray: FormArray = this.form.get('tourismTypes') as FormArray;

        if (event.checked) {
            formArray.push(new FormControl(event.source.value));
        } else {
            let i = 0;
            formArray.controls.forEach((ctrl: FormControl) => {
                if (ctrl.value === event.source.value) {
                    // Remove the unselected element from the arrayForm
                    formArray.removeAt(i);
                    return;
                }
                i++;
            });
        }
    }

    addInput(value: string): void {
        this.cityInputs.push(1);
        const formArray: FormArray = this.form.get('cities') as FormArray;
        formArray.push(new FormControl({name: value}));
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
