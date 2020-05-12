import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { AlternativeComponent } from './alternative/alternative.component';
import {FormComponent} from './form/form.component';
import {MaterialModule} from "../../angular-material/material.module";
import {FuseSharedModule} from "../../../@fuse/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { AlternativeElementComponent } from './alternative/alternative-element/alternative-element.component';


const routes = [
    {
        path: 'secret_places',
        redirectTo: 'secret_places/search'
    },
    {
        path: 'secret_places/search',
        component: FormComponent
    },
    {
        path: 'secret_places/result',
        component: AlternativeComponent
    }
];

@NgModule({
    declarations: [
        AlternativeComponent,
        FormComponent,
        AlternativeElementComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MaterialModule,
        FuseSharedModule,
        ReactiveFormsModule
    ],
    exports: []
})
export class SecretPlacesModule {
}
