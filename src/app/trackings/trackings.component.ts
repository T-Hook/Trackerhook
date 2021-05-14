import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalComponent} from "../_custom/GlobalController/global.component";
import {GlobalService} from "../_services/global.service";
import {ElectronService} from "../core/services";
import { first } from "rxjs/operators";
import { TrackingService } from "../_services/tracking.service";

@Component({
    selector: 'app-trackings',
    templateUrl: './trackings.component.html',
    styleUrls: ['./trackings.component.scss']
})
export class TrackingComponent extends GlobalComponent implements OnInit {

    public trackings = [];
    error: string;
    loading = false;
    public template ={
        panel:{
            header:{
                bgc:"bgc-light-blue-400",
                btnColor:"bgc-light-blue-400",
                btnIcon:"ti-view-list"
            }
        }
    };
    constructor(public router: Router, public globalService: GlobalService,
                private _electronService: ElectronService,public trackingService: TrackingService) {
        super(router, globalService)
    }

    ngOnInit() {

        if (!this.globalService.getToken || !this.globalService.currentUserValue) {
            this.router.navigate(['authentication']);
        }
        this.trackingService.list()
            .pipe(first())
            .subscribe(
                data => {
                    this.trackings = data;
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );


    }
}
