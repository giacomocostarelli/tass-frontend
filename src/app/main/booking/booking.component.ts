import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';
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
        private _userDetail: UserInfoService,
        private router: Router
    ) {

    }

    ngOnInit(): void {

        if (localStorage.getItem('user') === null){
            this.router.navigate(['']);
        }
    }

}
