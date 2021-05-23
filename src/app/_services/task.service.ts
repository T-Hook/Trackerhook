import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AppConfig} from '../../environments/environment';
import { GlobalService } from "./global.service";

@Injectable({providedIn: 'root'})
export class TaskService {

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
        return this.http.get<any>(`${this.config.apiUrl}/api/task/task`,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }})
            .pipe(map(tasks => {
                return tasks;
            }));
    }
    details(id : number) {
      return this.http.get<any>(`${this.config.apiUrl}/api/task/task/` + id ,
          { headers:{
                  Authorization:'bearer '+this.getToken()
              }});
  }

  start(id : number): Observable<Object> {
    return this.http.put<any>(`${this.config.apiUrl}/api/task/` +id,{
     status : "In progress"
    },
        { headers:{
                Authorization:'bearer '+this.getToken()
            }});
}
stop(id : number): Observable<Object> {
  return this.http.put<any>(`${this.config.apiUrl}/api/task/` +id,{
   status : "Finished"
  },
      { headers:{
              Authorization:'bearer '+this.getToken()
          }});
}

    listRoleUserInTask(idTask) {
        return this.http.get<any>(
            `${this.config.apiUrl}/api/task/${idTask}/user/role?Authorization=Bearer ${this.getToken()}`,
            {})
            .pipe(map(tasks => {
                return tasks;
            }));
    }





    oneById(id) {
        return this.http.get<any>(`${this.config.apiUrl}/api/task/${id}?Authorization=Bearer ${this.getToken()}`, {})
            .pipe(map(tasks => {
                return tasks;
            }));
    }


}
