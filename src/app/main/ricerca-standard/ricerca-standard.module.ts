import {NgModule} from '@angular/core';
import {RicercaStandardComponent} from './ricerca-standard.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {FuseSharedModule} from '@fuse/shared.module';
import {MaterialModule} from '../../angular-material/material.module';
import { RicercaDialogComponent} from './ricerca-dialog/ricerca-dialog.component';
import { BookingSheetComponent } from './ricerca-dialog/booking-sheet/booking-sheet.component';
import {MatBottomSheet} from "@angular/material/bottom-sheet";


const routes = [
    {
        path: 'ricerca_standard',
        component: RicercaStandardComponent
    }
];

@NgModule({
    declarations: [
        RicercaStandardComponent,
        RicercaDialogComponent,
        BookingSheetComponent
    ],
    entryComponents: [RicercaDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,

        FuseSharedModule,
        MaterialModule,
    ],
    exports: [
        RicercaStandardComponent
    ]
})
export class RicercaStandardModule {
}
