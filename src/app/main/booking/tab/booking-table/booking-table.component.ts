import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Booking} from '../../../interfaceDB/booking';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SpringService} from '../../../spring.service';

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

    imageNumberArray =  new Array();
    randImageArray: string[] = [
        'a-walk-amongst-friends-small',
        'braies-lake-small',
        'fall-glow-small',
        'lago-di-sorapis-small',
        'never-stop-changing-small',
        'yosemite-small'
    ];

    constructor(
        private _springService: SpringService
    ) {
    }

    ngOnInit(): void {
        if (this.paid) {
            this._springService.getPaidBooking()
                .subscribe(b => {
                    this.booking = b
                    this.genImageNumberArray();
                });
        } else {
            this._springService.getSavedBooking()
                .subscribe(b => {
                    this.booking = b;
                    console.log(this.paid + ':    ' + JSON.stringify(this.booking));
                    this.genImageNumberArray();
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
        if (confirm('Delete this booking?')) {
            this._springService.deleteBooking(id).subscribe(x =>
                this.booking.splice(this.booking.findIndex(b => b.id === id), 1)
            );
        }
    }

    getBookingName(book: Booking): string {
        let sojournsLength: number = book.sojourns.length;
        let bookingName: string = '';

        for (let i = 0; i < sojournsLength; i++) {
            bookingName = bookingName + book.sojourns[i].room.hotel.city.name + ' -';
        }

        //remove the last " -" to the string.
        bookingName = bookingName.substring(0, bookingName.length - 2);

        return bookingName;
    }

    genImageNumberArray(): void {
        let imageNumber: number;
        for (let i = 0; i < 100; i++) {
            imageNumber = Math.floor(Math.random() * 5) + 0;
            this.imageNumberArray.push(imageNumber);
        }
    }

    mapRandImage(imageNumber: number): string {
        return this.randImageArray[this.imageNumberArray[imageNumber]];
    }

}
