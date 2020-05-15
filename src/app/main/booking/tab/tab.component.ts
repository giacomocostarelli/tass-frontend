import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab1',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
    watchingDetails = false;
  constructor() { }

  ngOnInit() {
  }

}
