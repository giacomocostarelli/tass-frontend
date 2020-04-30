import { NgModule } from '@angular/core';
import {HomepageComponent} from './homepage.component';
import {RouterModule} from '@angular/router';


const routes = [
    {
        path     : 'homepage',
        component: HomepageComponent
    }
];

@NgModule({
  declarations: [
      HomepageComponent
  ],
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      HomepageComponent
  ]
})
export class HomepageModule { }
