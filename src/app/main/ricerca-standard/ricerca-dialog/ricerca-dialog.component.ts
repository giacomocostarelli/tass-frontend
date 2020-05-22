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

    getLogged(): boolean{
        return localStorage.getItem('user') !== null;
    }

    onBook(): void{
        console.log('Prenota');
        const newB: Booking = { sojourns: [this.soj]};
        this._springService.newBooking(newB).subscribe();
        /*
        deve creare una nuova prenotazione nel carrello contenente solo un nuovo soggiono con le
        date della ricerca e la stanza della card
         */
    }
    /*
      deve visualizzare tutte le prenotazioni e selezionare in quale aggiungere un nuovo soggiorno
      con le date della ricerca e la stanza della card
       */
    showBooking(): void{
        this._bottomSheet.open(BookingSheetComponent);
    }

}
