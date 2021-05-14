import { NgModule, OnInit } from '@angular/core';
import {TrackingComponent} from './trackings.component';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { GlobalService } from "../_services/global.service";
import { TrackingService } from "../_services/tracking.service";
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import {first} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ShowTrackingComponent } from "./show/showtrackings.component";
import { PaginationComponent } from "../pagination/pagination.component";
@NgModule({
    declarations: [TrackingComponent,ShowTrackingComponent,  PaginationComponent],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class TrackingModule extends GlobalComponent implements OnInit{

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public globalService: GlobalService,
        public trackingService: TrackingService
    ) {
        super(router, globalService);
    }
    ngOnInit(): void {
    }
}
