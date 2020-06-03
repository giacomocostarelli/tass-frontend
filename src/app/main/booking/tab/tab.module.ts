import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingTableComponent } from './booking-table/booking-table.component';
import {TabComponent} from './tab.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {ImageSliderComponent} from './image-slider/image-slider.component';
import {NgImageSliderModule} from 'ng-image-slider';
import {MatButtonModule} from '@angular/material';

@NgModule({
    declarations: [
        TabComponent,
        BookingDetailComponent,
        BookingTableComponent,
        ImageSliderComponent
    ],
    imports: [
        CommonModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        FuseSharedModule,
        NgImageSliderModule,

    ],
    exports: [
        TabComponent
    ]
})
export class TabModule {
}
