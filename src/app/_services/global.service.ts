import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../environments/environment';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class GlobalService implements OnInit {
    private currentUserSubject: BehaviorSubject<any>;
    private tokenSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public token: Observable<any>;
    public config = {
        apiUrl: AppConfig.hookServerUrl
    };

    constructor(public http: HttpClient, private router : Router) {
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
        this.tokenSubject.next(TokenObject);
        this.token = this.tokenSubject.asObservable();
        return TokenObject;
    }

    setProfile(profile) {

        this.currentUserSubject.next(profile);
        this.currentUser = this.currentUserSubject.asObservable();
        localStorage.setItem('currentUser', JSON.stringify(profile));
        return profile;
    }
    init() {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.tokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('__auth')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.token = this.tokenSubject.asObservable();
    }

    isLoggedIn() : boolean {
        return null !== this.getToken && null !== this.currentUserValue;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        localStorage.removeItem('__auth');
        this.tokenSubject.next(null);
        this.router.navigate(['authentication']);
    }
}
