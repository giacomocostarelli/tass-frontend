import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';
import {MenuColorChangerService} from '../../menuColorChanger.service';
import {Guest} from '../interfaceDB/guest';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookingComponent implements OnInit {
    user: Guest;

    constructor(
        private _menuColorChangerService: MenuColorChangerService
    ) {
        this.user = JSON.parse(localStorage.getItem('user')) as Guest;
    }

    ngOnInit(): void {
        this._menuColorChangerService.changePageSelected('profile');
    }

}
