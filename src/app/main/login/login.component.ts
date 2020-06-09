import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {SpringService} from '../spring.service';
import {Router} from '@angular/router';
import {Guest} from '../interfaceDB/guest';
import {sha256} from 'js-sha256';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';


declare var FB: any;

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {Router} router
     * @param {SpringService} springService
     * @param {AuthService} authService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private springService: SpringService,
        private router: Router,
        private authService: AuthService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
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

    /**
     * On init
     */
    ngOnInit(): void {
        this.facebookSDK();
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    // SECRET PLACES LOGIN
    onLoginSubmit(): void {
        const pwd = sha256(this.loginForm.get('password').value);
        this.springService.login(this.loginForm.get('email').value, pwd)
            .subscribe((result: any) => {
                const tokenInfo = {
                    token: result.token,
                    type: 0
                };
                const g = result.guest as Guest;
                this.saveLocalDataAndNavigate(tokenInfo, g);
        });
    }

    // FACEBOOK LOGIN
    onFacebookLoginSubmit(): void{
            FB.login((response) => {
                if (response.authResponse){
                    FB.api('/me', {fields: 'name, email, picture'}, (resp) => {
                        if (resp && !resp.error){
                            const g: Guest = {
                                name: resp.name,
                                email: resp.email
                            };
                            const tokenInfo = {
                                token: response.authResponse.accessToken,
                                type: 2
                            };
                            this.springService.socialLogin(g, tokenInfo)
                                .subscribe( (id: number) => {
                                    if (id !== null){
                                        g.id = id;
                                        g.imageUrl = resp.picture.data.url;
                                        this.saveLocalDataAndNavigate(tokenInfo, g);
                                    }
                                });
                        } else {
                            console.error(JSON.stringify(resp.error));
                        }
                    });
                }else{
                    console.error(JSON.stringify(response.error));
                }
            });
    }

    // GOOGLE LOGIN
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then( user => {
                const g: Guest = {
                    name: user.name,
                    email: user.email
                };
                const tokenInfo = {
                    token: user.idToken,
                    type: 1
                };
                this.springService.socialLogin(g, tokenInfo)
                    .subscribe( (id: number) => {
                        if (id !== null){
                            g.id = id;
                            g.imageUrl = user.photoUrl;
                            this.saveLocalDataAndNavigate(tokenInfo, g);
                        }
                    });
            });
    }

    facebookSDK(): void{
        (window as any).fbAsyncInit = () => {
            FB.init({
                appId      : '246982563186236',
                cookie     : true,
                xfbml      : true,
                version    : 'v7.0'
            });
            FB.AppEvents.logPageView();
        };


        // tslint:disable-next-line:only-arrow-functions
        (function(d, s, id): any{
            let js = d.getElementsByTagName(s)[0];
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    private saveLocalDataAndNavigate(tokenInfo, g): void {
        localStorage.setItem('token_info', JSON.stringify(tokenInfo));
        localStorage.setItem('user', JSON.stringify(g));
        this.router.navigate(['/homepage']);
    }

}
