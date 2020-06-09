import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Booking} from '../../../interfaceDB/booking';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SpringService} from '../../../spring.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateService} from '../../../date.service';
import {Car} from '../../../interfaceDB/car';

@Component({
    selector: 'booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookingDetailComponent implements OnInit {
    form: FormGroup;
    @Input() showDetail: boolean;
    @Output() showDetailChange = new EventEmitter<boolean>();
    @Input() bookingDetailItem: Booking;
    @Output() bookingDetailItemChange = new EventEmitter<Booking>();
    @Input() paid: boolean;

    carList: Car[];
    todayDate = new Date();


    constructor(
        private _springService: SpringService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private _dateService: DateService
    ) {
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            car: ['', Validators.required],
            arr: ['', Validators.required],
            dep: ['', Validators.required]
        });
    }

    backToList(): void {
        this.showDetail = false;
        this.showDetailChange.emit(this.showDetail);
        this.bookingDetailItem = null;
        this.bookingDetailItemChange.emit(this.bookingDetailItem);
    }

    PayBooking(): void {
        this._springService.payBooking(this.bookingDetailItem.id, 1)
            .subscribe(x => window.location.reload());
    }

    onFormSubmit(): void {
        console.log(this.form.value);
        this._springService.searchItem(
            this.form.get('car').value,
            this._dateService.getFinalDate(this.form.get('arr').value),
            this._dateService.getFinalDate(this.form.get('dep').value))
                .subscribe(itemList => this.carList = itemList);
        console.log(JSON.stringify(this.carList));
    }
}
