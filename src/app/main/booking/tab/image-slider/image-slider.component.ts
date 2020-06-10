import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgImageSliderComponent} from 'ng-image-slider';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
    // @ts-ignore
    @ViewChild('nav') slider: NgImageSliderComponent;
    @Input() private carouselType: number;

    imageObject: Array<object>;

    placesObject: Array<object> = [{
        image: '../../../../../../assets/images/profile/a-walk-amongst-friends-small.jpg',
        thumbImage: '../../../../../../assets/images/profile/a-walk-amongst-friends-small.jpg',
    }, {
        image: '../../../../../../assets/images/profile/braies-lake-small.jpg',
        thumbImage: '../../../../../../assets/images/profile/braies-lake-small.jpg',
        alt: 'Image2'
    }, {
        image: '../../../../../../assets/images/profile/fall-glow-small.jpg',
        thumbImage: '../../../../../../assets/images/profile/fall-glow-small.jpg',
        alt: 'Image3'
    }, {
        image: '../../../../../../assets/images/profile/first-snow-small.jpg',
        thumbImage: '../../../../../../assets/images/profile/first-snow-small.jpg',
        alt: 'Image4'
    }, {
        image: '../../../../../../assets/images/profile/lago-di-sorapis-small.jpg',
        thumbImage: '../../../../../../assets/images/profile/lago-di-sorapis-small.jpg',
        alt: 'image5'
    }, {
        image: '../../../../../../assets/images/profile/never-stop-changing-small.jpg',
        thumbImage: '../../../../../../assets/images/profile/never-stop-changing-small.jpg',
        alt: 'image6'
    }, {
        image: '../../../../../../assets/images/profile/reaching-small.jpg',
        thumbImage: '../../../../../../assets/images/profile/reaching-small.jpg',
        alt: 'image7'
    }
    ];

    private carsObject: Array<object> = [{
        image: '../../../../../../assets/images/cars/car1.jpg',
        thumbImage: '../../../../../../assets/images/cars/car1.jpg',
    }, {
        image: '../../../../../../assets/images/cars/car2.jpg',
        thumbImage: '../../../../../../assets/images/cars/car2.jpg',
    }, {
        image: '../../../../../../assets/images/cars/car3.jpg',
        thumbImage: '../../../../../../assets/images/cars/car3.jpg',
    }, {
        image: '../../../../../../assets/images/cars/car4.jpg',
        thumbImage: '../../../../../../assets/images/cars/car4.jpg',
    }, {
        image: '../../../../../../assets/images/cars/car5.jpg',
        thumbImage: '../../../../../../assets/images/cars/car5.jpg',
    },{
        image: '../../../../../../assets/images/cars/car1.jpg',
        thumbImage: '../../../../../../assets/images/cars/car1.jpg',
    }, {
        image: '../../../../../../assets/images/cars/car2.jpg',
        thumbImage: '../../../../../../assets/images/cars/car2.jpg',
    }, {
        image: '../../../../../../assets/images/cars/car3.jpg',
        thumbImage: '../../../../../../assets/images/cars/car3.jpg',
    }, {
        image: '../../../../../../assets/images/cars/car4.jpg',
        thumbImage: '../../../../../../assets/images/cars/car4.jpg',
    }, {
        image: '../../../../../../assets/images/cars/car5.jpg',
        thumbImage: '../../../../../../assets/images/cars/car5.jpg',
    },
    ];

    constructor() {
    }

    ngOnInit() {
        if (this.carouselType === 1) {
            this.imageObject = this.placesObject;
        } else {
            this.imageObject = this.carsObject;
        }
    }

}
