import { NgModule, OnInit } from '@angular/core';
import {TasksComponent} from './tasks.component';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "../_services/global.service";
import { TaskService } from "../_services/task.service";
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import {first} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [TasksComponent],
    imports: [
        CommonModule
    ]
})
export class TasksModule extends GlobalComponent implements OnInit{

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public globalService: GlobalService,
        public taskService: TaskService
    ) {
        super(router, globalService);
    }
    ngOnInit(): void {
    }
}
