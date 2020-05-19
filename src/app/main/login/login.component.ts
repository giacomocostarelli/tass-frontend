import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {SpringService} from '../spring.service';
import {Md5} from 'ts-md5/dist/md5';
import {Router} from '@angular/router';
import {Guest} from '../interfaceDB/guest';

declare var FB: any;

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [SpringService]
})
export class LoginComponent implements OnInit {
    auth2: any;

    @ViewChild('loginRef', {static: true}) loginElement: ElementRef;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private springService: SpringService,
        private router: Router
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

    loginForm: FormGroup;

    @ViewChild('email', {static: true}) email: ElementRef;
    @ViewChild('pwd', {static: true}) password: ElementRef;

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.googleSDK();
        this.facebookSDK();
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onLoginSubmit(): void {
        const md5 = new Md5();
        const pwd = md5.appendStr(this.password.nativeElement.value).end();
        this.springService.login(this.email.nativeElement.value, pwd)
            .subscribe((result: any) => {
                console.log(JSON.stringify(result));
                const tokenInfo = {
                    token: result.token,
                    type: 0
                };
                const g = result.guest as Guest;
                localStorage.setItem('token_info', JSON.stringify(tokenInfo));
                localStorage.setItem('user', JSON.stringify(g));
                this.router.navigate(['/homepage']);
        });
    }

    googleSDK(): void {
        window['googleSDKLoaded'] = () => {
            window['gapi'].load('auth2', () => {
                this.auth2 = window['gapi'].auth2.init({
                    client_id: '744778791116-5mm7c9an5oe38kh86qi36imgem919gq1.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile email'
                });
                this.prepareLoginButton();
            });
        };

        (function (d, s, id) {
            let js = d.getElementsByTagName(s)[0];
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));

    }

    facebookSDK(): void{
        (window as any).fbAsyncInit = function() {
            FB.init({
                appId      : '246982563186236',
                cookie     : true,
                xfbml      : true,
                version    : 'v7.0'
            });
            FB.AppEvents.logPageView();
        };


        (function (d, s, id) {
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

    prepareLoginButton(): void {

        this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
            (googleUser) => {

                const profile = googleUser.getBasicProfile();
                console.log(googleUser);
                // YOUR CODE HERE

                const g: Guest = {
                    email: profile.getEmail(),
                    name: profile.getName(),
                    imageUrl: profile.getImageUrl()
                };
                const tokenInfo = {
                    token: googleUser.getAuthResponse().id_token,
                    type: 1
                };
                // per logout =>   localStorage.clear();  scrivo qua poi creo servizio così non modifico toolbar
                localStorage.setItem('user', JSON.stringify(g));
                localStorage.setItem('token_info', JSON.stringify(tokenInfo));
                this.router.navigate(['/homepage']);

                this.springService.socialLogin();



            }, (error) => {
                alert(JSON.stringify(error, undefined, 2));
            });
    }

    onFacebookLoginSubmit(): void{
            FB.login((response) =>
            {
                if (response.authResponse)
                {
                    FB.api('/me', {fields: 'name, email, picture'}, (resp) =>{
                        if (resp && !resp.error){
                            const g: Guest = {
                                name: resp.name,
                                email: resp.email,
                                imageUrl: resp.picture.data.url,
                            };
                            const tokenInfo = {
                                token: response.authResponse.token,
                                type: 2
                            };
                            localStorage.setItem('user', JSON.stringify(g));
                            localStorage.setItem('token_info', JSON.stringify(tokenInfo));
                        }
                        this.router.navigate(['/homepage']);
                        this.springService.socialLogin();
                    });
                }
                else
                {
                    alert(JSON.stringify(response.error, undefined, 2));
                }
            });
    }
}
