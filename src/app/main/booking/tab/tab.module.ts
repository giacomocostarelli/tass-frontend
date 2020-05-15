import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingTableComponent } from './booking-table/booking-table.component';
import {TabComponent} from "./tab.component";


@NgModule({
    declarations: [
        TabComponent,
        BookingDetailComponent,
        BookingTableComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TabComponent
    ]
})
export class TabModule {
}
