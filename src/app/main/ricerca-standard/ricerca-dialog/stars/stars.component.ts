import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'stars',
    templateUrl: './stars.component.html'
})
export class StarsComponent implements OnInit {

    @Input() starsNumber: number;

    constructor( ) {
    }

    ngOnInit() {
    }

}
