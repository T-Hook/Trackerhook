import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AppConfig} from '../../environments/environment';
import { GlobalService } from "./global.service";
import { parseArguments } from "@angular/cli/models/parser";

@Injectable({providedIn: 'root'})
export class TrackingService {

    public config = {
        apiUrl: AppConfig.hookServerUrl
    };
    template = 'default';
    currentTracking: any;
    constructor(public http: HttpClient, public globalService: GlobalService) {
    }

    getToken() {
        return this.globalService.getToken.token;
    }

    list() {
        return this.http.get<any>(`${this.config.apiUrl}/api/trackingsession`,
            { headers:{
                    Authorization:'bearer '+this.getToken()
                }})
            .pipe(map(trackings => {
                return trackings;
            }));
    }

    listByTrackingId(id,parmas) {
        let filter ="";
        Object.keys(parmas).forEach(function(key) {
            var value = parmas[key];
            filter+=key+'='+parmas[key]+'&'
        });

        return this.http.get<any>(
            `${this.config.apiUrl}/api/trackingsession/${id}/tracking?${filter}Authorization=bearer ${this.getToken()}`,
            {})
            .pipe(map(trackings => {
                return trackings;
            }));
    }


}
