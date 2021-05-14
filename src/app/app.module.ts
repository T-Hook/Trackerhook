import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import {AuthenticationModule} from './authentication/authentication.module';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { StarterModule } from './starter/starter.module';
import { CompaniesModule } from './companies/companies.module';
import { ProjectsModule } from "./projects/projects.module";

// Confirm Dialog
import {ConfirmationDialogComponent} from "./shared/components/confirm-dialog/confirmation-dialog.component";
import {ConfirmationDialogService} from "./shared/components/confirm-dialog/confirmation-dialog.service";
import { TasksModule } from "./tasks/tasks.module";
import { SprintsModule } from "./sprints/sprints.module";
import { TrackingModule } from "./trackings/trackings.module";
import { PaginationComponent } from "./pagination/pagination.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
import { FilterPipe } from './_services/uniquepipe.pipe';
import { MailComponent } from './mail/mail/mail.component';
import { MailsComponent } from './mails/mails/mails.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent,
        ConfirmationDialogComponent,
        ProfileComponent,
        FilterPipe,
        MailComponent,
        MailsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        BsDropdownModule.forRoot(),
        AlertModule.forRoot(),
        CoreModule,
        SharedModule,
        NgbPaginationModule,
        NgbAlertModule,
        HomeModule,
        CommonModule,
        RouterModule,
        AuthenticationModule,
        AppRoutingModule,
        StarterModule,
        CompaniesModule,
        ProjectsModule,
        TasksModule,
        SprintsModule,
        TrackingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [ConfirmationDialogService],
    entryComponents: [ ConfirmationDialogComponent ],
    bootstrap: [
        AppComponent,
        SidebarComponent,
        NavbarComponent
    ]
})
export class AppModule {
}
