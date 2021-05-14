import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalComponent} from "../_custom/GlobalController/global.component";
import {GlobalService} from "../_services/global.service";
import {ElectronService} from "../core/services";
import { first } from "rxjs/operators";
import { CompanyService } from "../_services/company.service";

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent extends GlobalComponent implements OnInit {

    public companies = [];
    error: string;
    loading = false;
    constructor(public router: Router, public globalService: GlobalService,
                private _electronService: ElectronService,public companyService: CompanyService) {
        super(router, globalService)
    }

    ngOnInit() {

        if (!this.globalService.getToken || !this.globalService.currentUserValue) {
            this.router.navigate(['authentication']);
        }
        this.companyService.list()
            .pipe(first())
            .subscribe(
                data => {
                    this.companies = data;
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );

        if (this._electronService.isElectron) {
            this._electronService.ipcRenderer.send('companies-list', this.globalService.getToken);
            this._electronService.ipcRenderer.on('companies-list-reply', (event, response) => {
                // TODO Show companies in view
            });

        }


    }
}
