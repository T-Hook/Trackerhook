import { NgModule, OnInit } from '@angular/core';
import {SprintsComponent} from './sprints.component';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "../_services/global.service";
import { SprintService } from "../_services/sprint.service";
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import {first} from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SprintsComponent],
    imports: [
        CommonModule
    ]
})
export class SprintsModule extends GlobalComponent implements OnInit{

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public globalService: GlobalService,
        public sprintService: SprintService
    ) {
        super(router, globalService);
    }
    ngOnInit(): void {
    }
}
