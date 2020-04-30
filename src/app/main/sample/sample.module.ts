import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {SampleComponent} from './sample.component';
import {MaterialModule} from '../../angular-material/material.module'; /* CAPIRE SE SI PUò TOGLIERE DA QUA E MAGARI INSERIRLO SOLO APP.MODULE **/


const routes = [
    {
        path: 'sample',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,
        FuseSharedModule,
        MaterialModule
    ],
    exports: [
        SampleComponent
    ]
})

export class SampleModule {
}
