import {Component, Input, OnInit} from '@angular/core';
import {Alternative} from '../../../interfaceDB/alternative';

@Component({
  selector: 'alternative-element',
  templateUrl: './alternative-element.component.html',
  styleUrls: ['./alternative-element.component.scss']
})
export class AlternativeElementComponent implements OnInit {

    @Input() alternative: Alternative;

    constructor() { }

    ngOnInit() {
    }

}
