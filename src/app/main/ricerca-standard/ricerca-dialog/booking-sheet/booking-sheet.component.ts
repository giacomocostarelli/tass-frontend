import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {SpringService} from "../../../spring.service";

@Component({
    selector: 'app-booking-sheet',
    templateUrl: './booking-sheet.component.html',
    styleUrls: ['./booking-sheet.component.scss']
})
export class BookingSheetComponent implements OnInit {

    constructor(
        private _bottomSheetRef: MatBottomSheetRef<BookingSheetComponent>,
        private _springService: SpringService
    ) {}


    ngOnInit() {
        // this._springService.getBookingsID
    }

    selectBooking(num: number): void {
        this._bottomSheetRef.dismiss(num);
    }
}
