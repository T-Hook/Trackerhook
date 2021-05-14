import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { GlobalComponent } from "./_custom/GlobalController/global.component";
import { Router } from "@angular/router";
import { GlobalService } from "./_services/global.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends GlobalComponent  implements OnInit{
    constructor(
        private _cdr: ChangeDetectorRef,
        public electronService: ElectronService,
        private translate: TranslateService,
        public router: Router,
        public globalService: GlobalService
    ) {
        super(router, globalService);
        translate.setDefaultLang('en');

        if (electronService.isElectron) {
            console.log('Mode electron');
        } else {
            console.log('Mode web');
        }

    }
    ngOnInit(): void {

        setInterval(function(){
        },3000)
    }
}
