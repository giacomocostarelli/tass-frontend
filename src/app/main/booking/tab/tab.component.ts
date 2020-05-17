import {Component, Input, OnInit} from '@angular/core';
import {Booking} from '../../interfaceDB/booking';

@Component({
  selector: 'tab1',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
    bookingList: Booking[];
    showDetail = false;
    bookingDetailItem: Booking = null;
  constructor() { }

  ngOnInit() {
      /*this._springService.getBooking()
    .subscribe(b => this.bookingList = b);*/
      this.bookingList = [{id: 1}, {id: 2}, {id: 3}];
  }

}
