import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../interfaceDB/booking';
import {SpringService} from '../../spring.service';

@Component({
    selector: 'tab1',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
    showDetail = false;
    bookingDetailItem: Booking = null;

    @Input() paid: boolean;

    constructor(
        private _springService: SpringService
    ) {
    }

    ngOnInit(): void {}

}
