
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthenticationService implements OnInit {
    private currentUserSubject: BehaviorSubject<any>;
    private tokenSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public authorizationToken: string;
    public fromServer: string;
    public token: Observable<any>;
    public config = {
        production: AppConfig.production
    };

    constructor(public http: HttpClient) {

        const url = new URL(document.URL);
        this.authorizationToken = url.searchParams.get('authorizationToken');
        this.fromServer = url.searchParams.get('server');
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.tokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('__auth')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.token = this.tokenSubject.asObservable();
    }

    ngOnInit() {
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    public get getToken() {
        return this.tokenSubject.value;
    }


    saveTokenInSession(_token) {
        const TokenObject = {token: _token};
        localStorage.setItem('__auth', JSON.stringify(TokenObject));
        return TokenObject;
    }

    init() {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.tokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('__auth')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.token = this.tokenSubject.asObservable();
    }

    profile(token) {

    }



}
