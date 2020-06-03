import {Component, OnInit, ViewChild} from '@angular/core';
import {NgImageSliderComponent} from 'ng-image-slider';

@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
    // @ts-ignore
    @ViewChild('nav') slider: NgImageSliderComponent;
    imageObject: Array<object>;

    constructor() {
    }

    ngOnInit() {
        this.imageObject = [{
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
    }

    prevImageClick() {
        this.slider.prev();
    }

    nextImageClick() {
        this.slider.next();
    }

}
