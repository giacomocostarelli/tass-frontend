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
    constructor() { }

    ngOnInit() {
    }

    newBooking(): void{
        this.newBookingParent.next();
    }

}
