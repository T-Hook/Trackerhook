import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AppConfig} from '../../environments/environment';
import { GlobalService } from "./global.service";

@Injectable({providedIn: 'root'})
export class SprintService {

    public config = {
        apiUrl: AppConfig.hookServerUrl
    };
    template = 'default';
    currentSprint: any;
    constructor(public http: HttpClient, public globalService: GlobalService) {
    }

    getToken() {
        return this.globalService.getToken.token;
    }

    list() {
        return this.http.get<any>(`${this.config.apiUrl}/api/sprint/sprint`,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }})
            .pipe(map(sprints => {
                return sprints;
            }));
    }
    details(id : number) {
      return this.http.get<any>(`${this.config.apiUrl}/api/sprint/sprint/` + id ,
          { headers:{
                  Authorization:'bearer '+this.getToken()
              }});
  }

    listRoleUserInSprint(idSprint) {
        return this.http.get<any>(
            `${this.config.apiUrl}/api/sprint/${idSprint}/user/role?Authorization=Bearer ${this.getToken()}`,
            {})
            .pipe(map(sprints => {
                return sprints;
            }));
    }





    oneById(id) {
        return this.http.get<any>(`${this.config.apiUrl}/api/sprint/${id}?Authorization=Bearer ${this.getToken()}`, {})
            .pipe(map(sprints => {
                return sprints;
            }));
    }


}
