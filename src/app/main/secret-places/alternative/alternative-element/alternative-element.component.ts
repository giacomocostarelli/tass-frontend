import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Alternative} from '../../../interfaceDB/alternative';

@Component({
  selector: 'alternative-element',
  templateUrl: './alternative-element.component.html',
  styleUrls: ['./alternative-element.component.scss']
})
export class AlternativeElementComponent implements OnInit {

    @Input() alternative: Alternative;
    @Input() numberAlternative: number;
    @Output() newBookingParent = new EventEmitter<number>();
    logged: boolean;
    constructor() {
        this.logged = localStorage.getItem('user') !== null;
    }

    ngOnInit(): void {
    }

    newBooking(): void{
        this.newBookingParent.next();
    }

}
