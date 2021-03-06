import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import {RouterModule} from '@angular/router';
import {PricingModule} from './pricing/pricing.module';


const routes = [
    {
        path: 'homepage',
        component: HomepageComponent
    }
];

@NgModule({
    declarations: [
        HomepageComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        PricingModule,
    ],
    exports: [
        HomepageComponent
    ]
})
export class HomepageModule {
}
