import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {FuseSharedModule} from '@fuse/shared.module';
import {PricingComponent} from 'app/main/homepage/pricing/pricing.component';


const routes = [
    {
        path: 'pricing',
        component: PricingComponent
    },
];

@NgModule({
    declarations: [
        PricingComponent,
    ],
    exports: [
        PricingComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,

        FuseSharedModule
    ]
})
export class PricingModule {
}
