import {Component, ViewEncapsulation} from '@angular/core';
import {trigger, transition, useAnimation} from '@angular/animations';
import {zoomIn} from 'ng-animate';

@Component({
    selector: 'pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('zoomIn1', [transition('* => *', useAnimation(zoomIn, {
            params: {timing: 2, delay: 2}
        }))]),
        trigger('zoomIn2', [transition('* => *', useAnimation(zoomIn, {
            params: {timing: 2, delay: 2.5}
        }))]),
        trigger('zoomIn3', [transition('* => *', useAnimation(zoomIn, {
            params: {timing: 2, delay: 3}
        }))])
    ]
})
export class PricingComponent {
    zoomIn1: any;
    zoomIn2: any;
    zoomIn3: any;

    visible1 = false;
    visible2 = false;
    visible3 = false;

    /**
     * Constructor
     */
    constructor() {
        setTimeout(() => {
            this.visible1 = true;
        }, 2100);
        setTimeout(() => {
            this.visible2 = true;
        }, 2600);
        setTimeout(() => {
            this.visible3 = true;
        }, 3100);
    }

}
