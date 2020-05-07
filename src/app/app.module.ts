import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {MaterialModule} from './angular-material/material.module';
import {RegisterModule} from './main/register/register.module';
import {LoginModule} from './main/login/login.module';
import {HomepageModule} from './main/homepage/homepage.module';
import {SecretPlacesModule} from './main/secret-places/secret-places.module';
import {RicercaStandardModule} from './main/ricerca-standard/ricerca-standard.module';
import {Error404Module} from './main/errors/404/error-404.module';
import {Error500Module} from './main/errors/500/error-500.module';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'homepage'
    },
    {
        path: 'homepage',
        loadChildren: './main/homepage/homepage.module#HomepageModule'
    },
    {
        path: 'register',
        loadChildren: './main/register/register.module#RegisterModule'
    },
    {
        path: 'login',
        loadChildren: './main/login/login.module#LoginModule'
    },
    {
        path: 'secret_places',
        loadChildren: './main/secret-places/secret-places.module#SecretPlacesModule'
    },
    {
        path: 'ricerca_standard',
        loadChildren: './main/ricerca-standard/ricerca-standard.module#RicercaStandardModule'
    },
    {
        path: 'errors/error-500',
        loadChildren: './main/errors/500/error-500.module#Error500Module'
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'errors/error-404'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MaterialModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        RegisterModule,
        LoginModule,
        HomepageModule,
        SecretPlacesModule,
        RicercaStandardModule,

        // Errors
        Error404Module,
        Error500Module,

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
