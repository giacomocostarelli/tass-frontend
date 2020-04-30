import { NgModule } from '@angular/core';
import {RicercaStandardComponent} from './ricerca-standard.component';
import {RouterModule} from '@angular/router';


const routes = [
    {
        path     : 'ricerca_standard',
        component: RicercaStandardComponent
    }
];

@NgModule({
  declarations: [
      RicercaStandardComponent
  ],
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RicercaStandardComponent
  ]
})
export class RicercaStandardModule { }
