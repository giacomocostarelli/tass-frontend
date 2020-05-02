import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../interfaceDB/city';
import {Observable, of} from 'rxjs';
import {SpringService} from "../../spring.service";


export interface StateGroup {
    letter: string;
    names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();

    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
    selector: 'form-secret-places',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    favoriteSeason: string;
    starOne: string[] = ['*', '**', '***', '****', '*****'];
    starTwo: string[] = ['*', '**', '***', '****', '*****'];
    tourismTypes: string[] = ['balneare', 'montano', 'lacustre', 'naturalistico', 'culturale', 'termale', 'religioso', 'sportivo', 'enogastronomico'];
    cities: City[] = [{name: 'United States of America'}, {name: 'China'}]; // ...
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

        this.form = new FormGroup({
            // City: new FormControl('', Validators.required),
            City: new FormArray([], Validators.required),


            Days: new FormControl('', Validators.required), // prendono anche lettere
            MaxBudget: new FormControl('', Validators.required),
            People: new FormControl('', Validators.required),

            OnlyRegion: new FormControl('', Validators.required),
            OnlyNotRegion:  new FormControl('', Validators.required),

            MaxStars: new FormControl('', Validators.required),
            MinStars: new FormControl('', Validators.required),
            // le stelle invece di restituire un numero da 1 a 5 danno ****

            TourismType: new FormArray([], Validators.required),

            Arrival: new FormControl('', Validators.required),
            Departure: new FormControl('', Validators.required)
        });
        this.stateGroupOptions = this.sortCity();
        console.log(this.returnList);

    }
    public generateRowIndexes(count: number): Array<number> {
        const indexes = [];
        for (let i = 0; i < count; i++) {
            indexes.push(i);
        }
        return indexes;
    }


    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper(): void {
        this.springService.searchClips(this.form.value)
            .subscribe(alternative => console.log(JSON.stringify(alternative)));
    }

    onCheckChange(event): void {
        const formArray: FormArray = this.form.get('TourismType') as FormArray;

        /* Selected */
        if (event.target.checked){
            // Add a new control in the arrayForm
            formArray.push(new FormControl(event.target.value));
        }
        /* unselected */
        else {
            // find the unselected element
            let i = 0;

            formArray.controls.forEach((ctrl: FormControl) => {
                if (ctrl.value === event.target.value) {
                    // Remove the unselected element from the arrayForm
                    formArray.removeAt(i);
                    return;
                }

                i++;
            });
        }
    }

    addInput(value: string): void{
        this.cityInputs.push(1);
        const formArray: FormArray = this.form.get('City') as FormArray;
        formArray.push(new FormControl(value));
    }


    sortCity(): Observable<StateGroup[]>  {
        this.cities.sort((one, two) => (one.name > two.name ? 1 : -1));
        let thisLetter = 'A';
        let citySameLetter: string[] = [];
        for (const c of this.cities) {
            const city = c.name;
            if (city[0].toUpperCase() !== thisLetter) {
                if ( citySameLetter.length > 0){
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
}
