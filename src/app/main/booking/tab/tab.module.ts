import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingTableComponent } from './booking-table/booking-table.component';
import {TabComponent} from './tab.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {FuseSharedModule} from '../../../../@fuse/shared.module';


@NgModule({
    declarations: [
        TabComponent,
        BookingDetailComponent,
        BookingTableComponent
    ],
    imports: [
        CommonModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        FuseSharedModule,

    ],
    exports: [
        TabComponent
    ]
})
export class TabModule {
}
