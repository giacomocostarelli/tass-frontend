import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';
import {MenuColorChangerService} from '../../menuColorChanger.service';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookingComponent implements OnInit {

    constructor(
        private _menuColorChangerService: MenuColorChangerService
    ) {
    }

    ngOnInit(): void {
        this._menuColorChangerService.changePageSelected('profile');
    }

}
