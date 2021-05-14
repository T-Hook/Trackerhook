import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {AppConfig} from '../../environments/environment';
import { GlobalService } from "./global.service";
import { Observable } from 'rxjs';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Injectable({providedIn: 'root'})
export class UserService {

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
    getone(id: number): Observable<any> {
      return this.http.get<any>(`${this.config.apiUrl}/api/users/` + id,
      { headers:{
              Authorization:'bearer '+this.getToken()
          }})
      .pipe(map(users => {
          return users;
      }));
    }
    profile() {
        return this.http.get<any>(`${this.config.apiUrl}/api/users/user`,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }})
            .pipe(map(users => {
                return users;
            }));
    }
    get() {
      return this.http.get<any>(`${this.config.apiUrl}/api/users`,
          { headers:{
                  Authorization:'bearer '+this.getToken()
              }});
  }
    update(id :number) {
        return this.http.put<any>(`${this.config.apiUrl}/api/users/` + id,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }});
    }
    updatepassword(set: any): Observable<Object> {
      return this.http.post<any>(`${this.config.apiUrl}/auth/updatepassword`,{
        password1: set.password1,
        password2: set.password2,
        email:this.globalService.currentUserValue.email,
        password:set.password
      },
          { headers:{
                  Authorization:'bearer '+this.getToken()
              }});
  }
  details(id : number) {
    return this.http.get<any>(`${this.config.apiUrl}/api/users/` + id ,
        { headers:{
                Authorization:'bearer '+this.getToken()
            }});
}

edit(id: number, set: any): Observable<Object> {
  return this.http.put<any>(`${this.config.apiUrl}/api/users/` + id ,{
    fname: set.fname,
    lname: set.lname,
    username:set.username,
    email:set.email,
    position:set.position,
    speciality:set.speciality
  },
  { headers:{
          Authorization:'bearer '+this.getToken()
      }}
);
}


}

