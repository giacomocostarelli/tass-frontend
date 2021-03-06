import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Booking} from '../../../interfaceDB/booking';
import {fuseAnimations} from '../../../../../@fuse/animations';
import {SpringService} from '../../../spring.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateService} from '../../../date.service';
import {Car} from '../../../interfaceDB/car';
import {Sojourn} from "../../../interfaceDB/sojourn";

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
    startRent: string;
    endRent: string;
    sojournId: number;
    sojournIdList: Sojourn[];

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
            dep: ['', Validators.required],
            sojournId: ['', Validators.required]
        });
        this.sojournIdList = this.bookingDetailItem.sojourns;
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
        this.startRent = this._dateService.getFinalDate(this.form.get('arr').value);
        this.endRent = this._dateService.getFinalDate(this.form.get('dep').value);
        this.sojournId = this.form.get('sojournId').value;
        this._springService.searchItem(
            this.form.get('car').value,
            this.startRent,
            this.endRent)
                .subscribe(itemList => this.carList = itemList );
    }

    rentCar(id: number): void {
        this._springService.rentItem(this.sojournId, id, this.startRent, this.endRent)
            .subscribe( message => {
                if (message !== 'error') {
                    this.carList.splice(this.carList.findIndex(c => c.id === id), 1);
                }
                alert(message);
            });
    }
}
