import { Component, NgZone, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ElectronService } from "../core/services";
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import { GlobalService } from "../_services/global.service";
import { LoginService } from "../_services/login.service";
import { first } from 'rxjs/operators';
@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent extends GlobalComponent implements OnInit {

    authenticationForm: FormGroup;
    submitted = false;
    loginFailure = false;

    constructor(private formBuilder: FormBuilder, public router: Router, private zone: NgZone,
                private _electronService: ElectronService, public globalService: GlobalService,
                private loginService: LoginService) {
        super(router, globalService)
    }

    ngOnInit() {
        this.hideLoader();

        this.authenticationForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            company:['', [Validators.required, Validators.minLength(3)]]
        });
    }

    hideLoader() {
        const loader = document.getElementById('loader');
        setTimeout(function () {
            loader.classList.add('fadeOut');
        }, 300);
    }

    onSubmit() {
        this.submitted = true;
        this.loginFailure = false;

        // stop the process here if form is invalid
        if (this.authenticationForm.invalid) {
            return;
        }

        this.loginCheck();
    }

    loginCheck() {
        if (this._electronService.isElectron) {
            this._electronService.ipcRenderer.send('authentication', {
                "email": this.authenticationForm.get('email').value,
                "company": this.authenticationForm.get('company').value,
                "password": this.authenticationForm.get('password').value,
            });
            this._electronService.ipcRenderer.on('login-reply', (event, response) => {
                if (response.hasOwnProperty('token') && response.hasOwnProperty('profile')) {
                    this.globalService.saveTokenInSession(response.token);
                    this.globalService.setProfile(response.profile);
                    this.zone.run(() => {
                        this.router.navigate(['home']);
                    });
                } else {
                    this.zone.run(() => {
                        this.loginFailure = true
                    });
                }
            })
        } else {
            this.loginService.loginWithCompany(
                this.authenticationForm.get('email').value,
                this.authenticationForm.get('company').value,
                this.authenticationForm.get('password').value
            )
                .pipe(first())
                .subscribe(
                    data => {
                        if (data.token) {
                            this.globalService.saveTokenInSession(data.token);
                            this.loginService.profile(data.token)
                                .pipe(first())
                                .subscribe(reps => {
                                        this.globalService.setProfile(reps.data);
                                        this.zone.run(() => {
                                            this.router.navigate(['home']);
                                        });

                                    },
                                    error => {
                                        this.zone.run(() => {
                                            this.loginFailure = true
                                        });
                                    });
                        }
                    },
                    error => {
                        this.zone.run(() => {
                            this.loginFailure = true
                        });
                    }
                );
        }

    }
}
