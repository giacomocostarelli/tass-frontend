import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Booking} from '../../../interfaceDB/booking';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'booking-table',
    templateUrl: './booking-table.component.html',
    styleUrls: ['./booking-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookingTableComponent implements OnInit {

    @Input() booking: Booking[];
    @Input() showDetail: boolean;
    @Output() showDetailChange = new EventEmitter<boolean>();
    @Input() bookingDetailItem: Booking;
    @Output() bookingDetailItemChange = new EventEmitter<Booking>();

    constructor() {
    }

    ngOnInit() {
    }

    showBookingDetail(b: Booking): void{
        this.showDetail = true;
        this.showDetailChange.emit(this.showDetail);
        this.bookingDetailItem = b;
        this.bookingDetailItemChange.emit(this.bookingDetailItem);
    }
}
