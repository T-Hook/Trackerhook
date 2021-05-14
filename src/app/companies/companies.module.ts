import { NgModule, OnInit } from '@angular/core';
import {CompaniesComponent} from './companies.component';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "../_services/global.service";
import { CompanyService } from "../_services/company.service";
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import {first} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [CompaniesComponent],
    imports: [
        CommonModule
    ]
})
export class CompaniesModule extends GlobalComponent implements OnInit{

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public globalService: GlobalService,
        public companyService: CompanyService
    ) {
        super(router, globalService);
    }
    ngOnInit(): void {
    }
}
