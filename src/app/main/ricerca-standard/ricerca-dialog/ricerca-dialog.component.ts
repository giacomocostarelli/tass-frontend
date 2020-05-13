import {Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'ricerca-dialog',
    templateUrl: './ricerca-dialog.component.html',
    styleUrls: ['./ricerca-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RicercaDialogComponent implements OnInit {

    constructor(
        public matDialogRef: MatDialogRef<RicercaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any) {
    }

    ngOnInit() {
        // console.log(this._data.room.hotel.name);
    }

    onSave() {
        console.log('Salva');
        /*
        deve visualizzare tutte le prenotazioni e selezionare in quale aggiungere un nuovo soggiorno
        con le date della ricerca e la stanza della card
         */
    }

    onBook() {
        console.log('Prenota');
        /*
        deve creare una nuova prenotazione nel carrello contenente solo un nuovo soggiono con le
        date della ricerca e la stanza della card
         */
    }
}
