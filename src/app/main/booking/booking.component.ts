import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';
import {MenuColorChangerService} from '../../menuColorChanger.service';
import {UserInfoService} from '../_user-info.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class BookingComponent implements OnInit {

    constructor(
        private _menuColorChangerService: MenuColorChangerService,
        private _userDetail: UserInfoService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this._menuColorChangerService.changePageSelected('profile');
        if (localStorage.getItem('user') === null){
            this.router.navigate(['']);
        }
    }

}
