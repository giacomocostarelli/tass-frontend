import {NgModule} from '@angular/core';
import {MaterialModule} from '../../../angular-material/material.module';
import {FormComponent} from './form.component';
import {FuseSharedModule} from '../../../../@fuse/shared.module';

@NgModule({
    declarations: [
        FormComponent
    ],
    imports: [
        MaterialModule,
        FuseSharedModule
    ],
    exports: [
        FormComponent
    ]
})
export class FormModule {
}
