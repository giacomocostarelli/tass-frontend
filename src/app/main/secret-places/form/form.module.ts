import {NgModule} from '@angular/core';
import {MaterialModule} from '../../../angular-material/material.module';
import {FormComponent} from './form.component';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import 'animate.compat.css';

@NgModule({
    declarations: [],
    imports: [
        MaterialModule,
        FuseSharedModule,
        ReactiveFormsModule
    ],
    exports: [
        FormComponent
    ]
})
export class FormModule {
}
