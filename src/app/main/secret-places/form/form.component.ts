import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'form-secret-places',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    favoriteSeason: string;
    starOne: string[] = ['*', '**', '***', '****', '*****'];
    starTwo: string[] = ['*', '**', '***', '****', '*****'];
    balneare = false;
    montano = false;
    lacustre = false;
    naturalistico = false;
    culturale = false;
    termale = false;
    religioso = false;
    sportivo = false;
    enogastronomico = false;

    form: FormGroup;

    // Vertical Stepper
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;
    verticalStepperStep4: FormGroup;
    verticalStepperStep5: FormGroup;


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

        // Vertical Stepper form stepper
        this.verticalStepperStep1 = this._formBuilder.group({
            cityNumber: ['', Validators.required],
        });

        this.verticalStepperStep2 = this._formBuilder.group({
            durata: ['', Validators.required],
            budget: ['', Validators.required],
            persone: ['', Validators.required],
        });

        this.verticalStepperStep3 = this._formBuilder.group({
        });

        this.verticalStepperStep4 = this._formBuilder.group({
        });

        this.verticalStepperStep5 = this._formBuilder.group({
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
        alert('You have finished the vertical stepper!');
    }
}
