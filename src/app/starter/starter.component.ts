import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import { GlobalService } from "../_services/global.service";

@Component({
    selector: 'app-starter',
    templateUrl: './starter.component.html',
    styleUrls: ['./starter.component.scss']
})
export class StarterComponent extends GlobalComponent implements OnInit {


    constructor(public router: Router,
                public globalService: GlobalService) {
        super(router, globalService)
    }

    ngOnInit() {

    }
}
