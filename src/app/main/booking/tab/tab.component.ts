import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../interfaceDB/booking';
import {SpringService} from '../../spring.service';

@Component({
    selector: 'tab1',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
    bookingList: Booking[];
    showDetail = false;
    bookingDetailItem: Booking = null;

    @Input() paid: boolean;

    constructor(
        private _springService: SpringService
    ) {
    }

    ngOnInit(): void {
        if (this.paid){
            this._springService.getPaidBooking()
                .subscribe(b => this.bookingList = b);
        }else{
            this._springService.getSavedBooking()
                .subscribe(b => this.bookingList = b);
        }

       //  this.bookingList = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}];
    }

}
