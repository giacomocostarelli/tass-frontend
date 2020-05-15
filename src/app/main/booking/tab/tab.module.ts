import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingTableComponent } from './booking-table/booking-table.component';
import {FormComponent} from "../../secret-places/form/form.component";
import {AlternativeComponent} from "../../secret-places/alternative/alternative.component";
import {RouterModule} from "@angular/router";


const routes = [
    {
        path: 'profile/bookings/:book_id',
        component: BookingDetailComponent
    },
    {
        path: 'profile/bookings',
        component: BookingTableComponent
    }
];

@NgModule({
    declarations: [
        BookingDetailComponent,
        BookingTableComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class TabModule {
}
