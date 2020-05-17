import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Booking} from '../../../interfaceDB/booking';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
  selector: 'booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookingDetailComponent implements OnInit {

    @Input() showDetail: boolean;
    @Output() showDetailChange = new EventEmitter<boolean>();
    @Input() bookingDetailItem: Booking;
    @Output() bookingDetailItemChange = new EventEmitter<Booking>();

  constructor() { }

  ngOnInit() {
  }

  backToList(){
      this.showDetail = false;
      this.showDetailChange.emit(this.showDetail);
      this.bookingDetailItem = null;
      this.bookingDetailItemChange.emit(this.bookingDetailItem);
  }

}
