import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeInLeft} from 'ng-animate';

@Component({
    selector: 'pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('zoomIn1', [transition('* => *', useAnimation(fadeInLeft, {
            params: {timing: 0.5, delay: 1}
        }))]),
        trigger('zoomIn2', [transition('* => *', useAnimation(fadeInLeft, {
            params: {timing: 0.5, delay: 1.25}
        }))]),
        trigger('zoomIn3', [transition('* => *', useAnimation(fadeInLeft, {
            params: {timing: 0.5, delay: 1.5}
        }))])
    ]
})
export class PricingComponent implements OnInit{
    zoomIn1: any;
    zoomIn2: any;
    zoomIn3: any;

    visible1 = false;
    visible2 = false;
    visible3 = false;

    logged: boolean

    constructor() {
        setTimeout(() => {
            this.visible1 = true;
        }, 1100);

        setTimeout(() => {
            this.visible2 = true;
        }, 1350);

        setTimeout(() => {
            this.visible3 = true;
        }, 1600);
    }

    ngOnInit(): void {
        this.logged = localStorage.getItem('user') !== null;
    }
}
