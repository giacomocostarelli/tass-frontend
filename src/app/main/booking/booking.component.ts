import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from "../../../@fuse/animations";
import {Booking} from "../interfaceDB/booking";
import {Observable} from "rxjs";
import {SpringService} from "../spring.service";

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookingComponent implements OnInit {
    bookingList: Booking[];

    constructor(
        private _springService: SpringService
    ) {
    }

    ngOnInit() {
        this._springService.getBooking()
            .subscribe(b => this.bookingList = b);
        console.log(this.bookingList);
    }

}
