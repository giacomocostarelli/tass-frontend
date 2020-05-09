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
}
