import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Alternative} from '../../interfaceDB/alternative';
import {SecretPlacesService} from '../secret-places.service';
import {Router} from '@angular/router';
import {Booking} from '../../interfaceDB/booking';
import {SpringService} from '../../spring.service';

@Component({
    selector: 'app-alternative',
    templateUrl: './alternative.component.html',
    styleUrls: ['./alternative.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AlternativeComponent implements OnInit {

    alternative: Alternative[] = [];
    startingDate: Date;

    constructor(
        private _alternativeService: SecretPlacesService,
        private router: Router,
        private _springService: SpringService
    ) {
    }

    ngOnInit(): void {
        this.alternative = this._alternativeService.getAlternative();
        this.startingDate = this._alternativeService.getStartingDate();
    }

    createNewBooking(id: number): void {
        const newB: Booking = {sojourns: this.alternative[id].sojourns};
        this._springService.newBooking(newB).subscribe();
        this.router.navigate(['/secret_places']);
    }


}
