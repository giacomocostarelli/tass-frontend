import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';
import {Booking} from '../interfaceDB/booking';
import {Observable} from 'rxjs';
import {SpringService} from '../spring.service';
import {MenuColorChangerService} from "../../menuColorChanger.service";

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
        private _springService: SpringService,
        private _menuColorChangerService: MenuColorChangerService
    ) {
    }

    ngOnInit() {
        this._springService.getBooking()
            .subscribe(b => {
                this.bookingList = b;
                console.log('B: ' + JSON.stringify(b));
            });
        this._menuColorChangerService.changePageSelected('profile');
        /*this.bookingList = [{id: 1}, {id: 2}, {id: 3}];*/
        console.log(JSON.stringify(this.bookingList));
    }

}
