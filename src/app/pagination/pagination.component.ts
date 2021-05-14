import { Component, Input, NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-pagination",
    styleUrls: ['pagination.component.scss'],
    templateUrl: "pagination.component.html"
})
export class PaginationComponent implements OnInit {
    @Input() pagination: any = {};
    paginationObject = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 20,
        pages: []
    }

    constructor() {
    }

    ngOnInit(): void {
        this.paginationObject.currentPage = this.pagination.page;
        this.paginationObject.totalPages = this.pagination.pages;
        this.paginationObject.totalItems = this.pagination.total;
        this.paginationObject.perPage = this.pagination.limit;
        let active = false;
        if (this.pagination.pages > 8) {

            let leng = 8;
            let lastPage = 0;
            for (let i = this.paginationObject.currentPage - 3; i < leng; i++) {
                active = i == this.paginationObject.currentPage;
                lastPage = i;
                if (i > 1) {
                    if(this.paginationObject.currentPage>5){
                        this.paginationObject.pages.push({
                            value: "<<",
                            active: false
                        })
                    }
                    this.paginationObject.pages.push({
                        value: i+1,
                        active: active
                    })
                } else {
                    leng++;
                }

            }
            if (lastPage < this.paginationObject.totalPages) {
                this.paginationObject.pages.push({
                    value: '>>',
                    active: false
                });
                this.paginationObject.pages.push({
                    value: this.paginationObject.totalPages,
                    active: false
                })
            }
        } else {

            for (let i = 0; i < this.paginationObject.totalPages; i++) {
                active = !!(i == this.paginationObject.currentPage);
                this.paginationObject.pages.push({
                    value: i+1,
                    active: active
                })
            }
        }

    }
}
