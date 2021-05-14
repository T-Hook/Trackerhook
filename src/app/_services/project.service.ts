import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AppConfig} from '../../environments/environment';
import { GlobalService } from "./global.service";

@Injectable({providedIn: 'root'})
export class ProjectService {

    public config = {
        apiUrl: AppConfig.hookServerUrl
    };
    template = 'default';
    currentProject: any;
    constructor(public http: HttpClient, public globalService: GlobalService) {
    }

    getToken() {
        return this.globalService.getToken.token;
    }

    list() {
        return this.http.get<any>(`${this.config.apiUrl}/api/project/u`,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }})
            .pipe(map(projects => {
                return projects;
            }));
    }
    details(id : number) {
        return this.http.get<any>(`${this.config.apiUrl}/api/project/` + id ,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }});
    }

    listRoleUserInProject(idProject) {
        return this.http.get<any>(
            `${this.config.apiUrl}/api/project/${idProject}/user/role?Authorization=Bearer ${this.getToken()}`,
            {})
            .pipe(map(projects => {
                return projects;
            }));
    }





    oneById(id) {
        return this.http.get<any>(`${this.config.apiUrl}/api/project/${id}?Authorization=Bearer ${this.getToken()}`, {})
            .pipe(map(projects => {
                return projects;
            }));
    }


}
