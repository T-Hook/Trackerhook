import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AppConfig} from '../../environments/environment';
import { GlobalService } from "./global.service";

@Injectable({providedIn: 'root'})
export class CompanyService {

    public config = {
        apiUrl: AppConfig.hookServerUrl
    };
    template = 'default';
    currentCompany: any;
    constructor(public http: HttpClient, public globalService: GlobalService) {
    }

    getToken() {
        return this.globalService.getToken.token;
    }

    list() {
        return this.http.get<any>(`${this.config.apiUrl}/api/company`,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }})
            .pipe(map(companies => {
                return companies;
            }));
    }

    listRoleUserInCompany(idCompany) {
        return this.http.get<any>(
            `${this.config.apiUrl}/api/company/${idCompany}/user/role?Authorization=Bearer ${this.getToken()}`,
            {})
            .pipe(map(companies => {
                return companies;
            }));
    }





    oneById(id) {
        return this.http.get<any>(`${this.config.apiUrl}/api/company/${id}?Authorization=Bearer ${this.getToken()}`, {})
            .pipe(map(companies => {
                return companies;
            }));
    }


}
