import {Component, OnInit, ViewEncapsulation, Inject, Input} from '@angular/core';
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


    constructor(
        public matDialogRef: MatDialogRef<RicercaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _springService: SpringService,
        private _bottomSheet: MatBottomSheet
    ) {}

    ngOnInit() {
        console.log(this._data.room.hotel.name);
        this.soj.room = this._data.room;
        this.soj.arrival = this._data.startingDate;
        this.soj.departure = this._data.returnDate;
    }

    getLogged(): boolean{ // TODO => disabilitiare button salva se utente non loggato
        return localStorage.getItem('user') !== null;
    }

    showBooking(): void{
        const bookingSelected = this._bottomSheet.open(BookingSheetComponent);
        bookingSelected.afterDismissed().subscribe(
            (dataFromBottomSheet: number) => this.saveBooking(dataFromBottomSheet)
        );
    }

    private saveBooking(id: number): void { // TODO => cosa farà dopo aver salvato booking?
        if (id < 0){    // nuovo booking
            console.log('crea nuovo booking');
            const newB: Booking = { sojourns: [this.soj] };
            // this._springService.newBooking(newB).subscribe();
        } else { // booking esistente
            console.log('aggiung soggiorno a booking: ' + id);
            // this._springService.addToExistingBooking(id, newB).subscribe();
        }
    }

}
