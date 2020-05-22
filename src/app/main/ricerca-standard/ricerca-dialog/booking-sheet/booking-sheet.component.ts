import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
    selector: 'app-booking-sheet',
    templateUrl: './booking-sheet.component.html',
    styleUrls: ['./booking-sheet.component.scss']
})
export class BookingSheetComponent implements OnInit {

    constructor(
        private _bottomSheetRef: MatBottomSheetRef<BookingSheetComponent>
    ) {}


    ngOnInit() {
    }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
}
