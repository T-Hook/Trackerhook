import { NgModule, OnInit } from '@angular/core';
import {ProjectsComponent} from './projects.component';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "../_services/global.service";
import { ProjectService } from "../_services/project.service";
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import {first} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [ProjectsComponent],
    imports: [
        CommonModule
    ]
})
export class ProjectsModule extends GlobalComponent implements OnInit{

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public globalService: GlobalService,
        public projectService: ProjectService
    ) {
        super(router, globalService);
    }
    ngOnInit(): void {
    }
}
