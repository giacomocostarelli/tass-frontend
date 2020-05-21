import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Alternative} from '../../interfaceDB/alternative';
import {SecretPlacesService} from '../secret-places.service';
import {Router} from '@angular/router';

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
        private router: Router
    ) {
    }

    ngOnInit() {
        this.alternative = this._alternativeService.getAlternative();
        this.startingDate = this._alternativeService.getStartingDate();
        console.log(JSON.stringify(this.alternative));
        // if (this.alternative.length === 0){ this.router.navigate(['/secret_places'])}
    }

    createNewBooking(id: number): void{
        console.log('prenota alternativa: ' + id);


    }

}
