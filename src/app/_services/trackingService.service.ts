import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../environments/environment';
import { Router } from "@angular/router";
import { ElectronService } from "../core/services";

@Injectable({providedIn: 'root'})
export class TrackingService implements OnInit {
    public readonly TRACKING_STATUS_INITIAL = 0;
    public readonly TRACKING_STATUS_STARTED = 1;
    public readonly TRACKING_STATUS_STOPPED = 2;
    public readonly TRACKING_STATUS_PAUSED = 3;
    public trackingStatus= this.TRACKING_STATUS_INITIAL;

    mouseClick = 0;
    keyPress = 0;
    datestart:any;
    dateend:any;
    elapsedTime = 0;
    time:any;
    hours:any;
    minutes:any;
    seconds:any;
    psList = [];
    screen = null;
    usedMemory = 0;
    listOpenWindows = [];
    realTimeView=false;
    totalMouseClick =0;
    totalKeyPress= 0;
    trackingRank = 0;
    trackingPaused = 0;
    activeSession = 0;

    constructor( private _electronService: ElectronService ) {

    }

    ngOnInit() {

    }

    isTrackingStarted(): boolean {
        return this.trackingStatus == this.TRACKING_STATUS_STARTED;
    }

    isTrackingStopped(): boolean {
        return this.trackingStatus == this.TRACKING_STATUS_STOPPED;
    }

    isTrackingPaused(): boolean {
        return this.trackingStatus == this.TRACKING_STATUS_PAUSED;
    }

    resetTrackingData() {
        // this.mouseClick = 0;
        // this.keyPress = 0;
        // this.psList = [];
        // this.screen = null;
        // this.usedMemory = 0;
        // this.listOpenWindows = [];
    }
}
