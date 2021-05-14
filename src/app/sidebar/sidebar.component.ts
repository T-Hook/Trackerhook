import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import { GlobalService } from "../_services/global.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends GlobalComponent implements OnInit {
    public samplePagesCollapsed = true;

    constructor(public router: Router, public globalService: GlobalService
    ) {
        super(router, globalService);
    }

    ngOnInit() {
    }

}
