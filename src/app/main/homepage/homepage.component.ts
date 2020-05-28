import {Component, OnInit} from '@angular/core';
import {FuseConfigService} from '../../../@fuse/services/config.service';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit {

    constructor(
        private _fuseConfigService: FuseConfigService
    ) {
        this._fuseConfigService.config = { // sistemato il layout sta roba si può rimuovere
            layout: {
                navbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit() {
    }

}
