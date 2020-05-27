import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {SpringService} from '../../../spring.service';

@Component({
    selector: 'app-booking-sheet',
    templateUrl: './booking-sheet.component.html'
})
export class BookingSheetComponent implements OnInit {

    listID: number[] = [];

    constructor(
        private _bottomSheetRef: MatBottomSheetRef<BookingSheetComponent>,
        private _springService: SpringService
    ) {}


    ngOnInit(): void {
         this._springService.getBookingsID().subscribe( list => this.listID = list);
    }

    selectBooking(num: number): void {
        this._bottomSheetRef.dismiss(num);
    }
}
