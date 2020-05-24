import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Booking} from '../../../interfaceDB/booking';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SpringService} from "../../../spring.service";

@Component({
    selector: 'booking-table',
    templateUrl: './booking-table.component.html',
    styleUrls: ['./booking-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookingTableComponent implements OnInit {

    booking: Booking[];
    @Input() showDetail: boolean;
    @Output() showDetailChange = new EventEmitter<boolean>();
    @Input() bookingDetailItem: Booking;
    @Output() bookingDetailItemChange = new EventEmitter<Booking>();
    @Input() paid: boolean;

    constructor(
        private _springService: SpringService
    ) {
    }

    ngOnInit(): void {
        if (this.paid){
            this._springService.getPaidBooking()
                .subscribe(b => this.booking = b);
        }else {
            this._springService.getSavedBooking()
                .subscribe(b => {
                    this.booking = b;
                    console.log(this.paid + ':    ' + JSON.stringify(this.booking));
                });
        }
    }

    showBookingDetail(b: Booking): void {
        this.showDetail = true;
        this.showDetailChange.emit(this.showDetail);
        this.bookingDetailItem = b;
        this.bookingDetailItemChange.emit(this.bookingDetailItem);
    }

    delete(id: number): void { // TODO chiamare server e cancellare prenotazione
        if (confirm('Are you sure to delete this booking?')){
            this._springService.deleteBooking(id).subscribe( x =>
                this.booking.splice(this.booking.findIndex(b => b.id === id), 1)
            );

        }
    }

}
