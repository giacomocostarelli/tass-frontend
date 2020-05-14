import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingComponent} from "./booking.component";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {RicercaStandardComponent} from "../ricerca-standard/ricerca-standard.component";
import {FuseSharedModule} from "../../../@fuse/shared.module";

const routes = [
    {
        path: 'profile',
        component: BookingComponent
    }
];


@NgModule({
    declarations: [
        BookingComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        // DA CONTROLLARE SE SERVONO
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        FuseSharedModule,
    ],
    exports: [
        BookingComponent
    ]
})
export class BookingModule {
}
