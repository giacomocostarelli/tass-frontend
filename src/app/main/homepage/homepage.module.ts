import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from './homepage.component';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '../../../@fuse/shared.module';


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
      CommonModule,

      FuseSharedModule
  ],
  exports: [
      HomepageComponent
  ]
})
export class HomepageModule { }
