import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from "../../interfaceDB/city";

@Component({
    selector: 'form-secret-places',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    favoriteSeason: string;
    starOne: string[] = ['*', '**', '***', '****', '*****'];
    starTwo: string[] = ['*', '**', '***', '****', '*****'];
    tourismTypes: string[] = ['balneare', 'montano', 'lacustre', 'naturalistico', 'culturale', 'termale', 'religioso', 'sportivo', 'enogastronomico']
    cities: City[] = [{name: 'United States of America'},{name: 'China'}]; // ...

    form: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            City: new FormControl('', Validators.required),
            // City: new FormArray([], Validators.required),
            //

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
        alert(this.form.get('TourismType').value);
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
            let i: number = 0;

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
}
