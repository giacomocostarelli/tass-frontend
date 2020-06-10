import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Sojourn} from '../../interfaceDB/sojourn';
import {Booking} from '../../interfaceDB/booking';
import {SpringService} from '../../spring.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BookingSheetComponent} from './booking-sheet/booking-sheet.component';


@Component({
    selector: 'ricerca-dialog',
    templateUrl: './ricerca-dialog.component.html',
    styleUrls: ['./ricerca-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RicercaDialogComponent implements OnInit {
    private soj: Sojourn = {};
    logged: boolean;


    constructor(
        public matDialogRef: MatDialogRef<RicercaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _springService: SpringService,
        private _bottomSheet: MatBottomSheet
    ) {
        this.logged = localStorage.getItem('user') !== null;
    }

    ngOnInit() {
        this.soj.room = this._data.room;
        this.soj.arrival = this._data.startingDate;
        this.soj.departure = this._data.returnDate;
    }

    showBooking(): void {
        if (this.logged) {
            const bookingSelected = this._bottomSheet.open(BookingSheetComponent);
            bookingSelected.afterDismissed().subscribe(
                (dataFromBottomSheet: number) => {
                    if (typeof dataFromBottomSheet === 'number') {
                        this.saveBooking(dataFromBottomSheet);
                    }
                }
            );
        } else {
            window.alert("Per prenotare una stanza effettua prima il login.");
        }

    }

    private saveBooking(id: number): void {
        if (id < 0) {    // nuovo booking
            const newB: Booking = {sojourns: [this.soj]};
            console.log('crea nuovo booking');
            this._springService.newBooking(newB).subscribe();
        } else { // booking esistente
            console.log('aggiung soggiorno a booking: ' + id);
            this._springService.addToExistingBooking(id, this.soj).subscribe();
        }
        this.matDialogRef.close(this.soj.room.id);
    }

}
