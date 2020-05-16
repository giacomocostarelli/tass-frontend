import {Component} from '@angular/core';
import {MenuColorChangerService} from '../../../menuColorChanger.service';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    constructor(private menuColorChangerService: MenuColorChangerService) { }

}
