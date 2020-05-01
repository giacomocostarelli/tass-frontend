import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'ricerca_standard',
    templateUrl: './ricerca-standard.component.html',
    styleUrls: ['./ricerca-standard.component.scss']
})
export class RicercaStandardComponent implements OnInit {
    form: FormGroup;

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        // Reactive Form
        this.form = this._formBuilder.group({
            company: [
                {
                    value: 'Google',
                    disabled: true
                }, Validators.required
            ],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            address2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            country: ['', Validators.required]
        });
    }

}
