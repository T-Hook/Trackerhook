import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AppConfig} from '../../environments/environment';
import { GlobalService } from "./global.service";

@Injectable({providedIn: 'root'})
export class NotificationService {

    public config = {
        apiUrl: AppConfig.hookServerUrl
    };
    template = 'default';
    currentTask: any;
    constructor(public http: HttpClient, public globalService: GlobalService) {
    }

    getToken() {
        return this.globalService.getToken.token;
    }

    list() {
        return this.http.get<any>(`${this.config.apiUrl}/api/notification/notification`,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }});
    }
    listmails() {
      return this.http.get<any>(`${this.config.apiUrl}/api/mail/mail`,
          { headers:{
                  Authorization:'bearer '+this.getToken()
              }});
  }
  listmaildisscussion(id : number) {
    return this.http.get<any>(`${this.config.apiUrl}/api/mail/mails/` + id,
        { headers:{
                Authorization:'bearer '+this.getToken()
            }});
}
  sendmail(set: any): Observable<Object> {
    return this.http.post<any>(`${this.config.apiUrl}/api/mail` ,{
    message:set.message,
    idS: this.globalService.currentUserValue._id,
    idR: set.idR,
    date : new Date()
    },
    { headers:{
            Authorization:'bearer '+this.getToken()
        }}
  );
  }



}

