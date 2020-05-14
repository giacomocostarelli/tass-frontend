import { Component } from '@angular/core';

@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent {

    page: string;

    constructor() {
    }

    onSelect(page: string) {
        
    }
}
