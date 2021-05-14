import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppConfig } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class LoginService {

    public config = {
        apiUrl: AppConfig.hookServerUrl
    };

    constructor(public http: HttpClient) {
    }

    login(username, password) {
        const credentials = {
            'email': username,
            'password': password
        };
        return this.http.post<any>(`${this.config.apiUrl}/auth/login`, credentials)
            .pipe(map(userAuthResult => {
                return userAuthResult;
            }));
    }

    loginWithCompany(username, company, password) {
        const credentials = {
            'email': username,
            'password': password,
            'company': company
        };
        return this.http.post<any>(`${this.config.apiUrl}/auth/login/company`, credentials)
            .pipe(map(userAuthResult => {
                return userAuthResult;
            }));
    }

    profile(token) {
        return this.http.get<any>(`${this.config.apiUrl}/api/users/me?Authorization=bearer ${token}`, {
            headers: {
                Authorization: 'bearer ' + token
            }
        })
            .pipe(map(resp => {
                if (resp.status === 200) {
                    return resp;
                } else {
                    return {};
                }
            }));
    }


}
