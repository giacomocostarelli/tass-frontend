import {Component, ViewEncapsulation} from '@angular/core';
import {trigger, transition, useAnimation} from '@angular/animations';
import {zoomIn} from 'ng-animate';
import {MenuColorChangerService} from '../../../menuColorChanger.service';

@Component({
    selector: 'pricing',
    templateUrl: './pricing.component.html',
    styleUrls: ['./pricing.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('zoomIn1', [transition('* => *', useAnimation(zoomIn, {
            params: {timing: 0.5, delay: 1}
        }))]),
        trigger('zoomIn2', [transition('* => *', useAnimation(zoomIn, {
            params: {timing: 0.5, delay: 1.25}
        }))]),
        trigger('zoomIn3', [transition('* => *', useAnimation(zoomIn, {
            params: {timing: 0.5, delay: 1.5}
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

    constructor(private menuColorChangerService: MenuColorChangerService) {
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
}
