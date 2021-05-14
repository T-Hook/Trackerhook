import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './authentication.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [AuthenticationComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AuthenticationModule {
}
