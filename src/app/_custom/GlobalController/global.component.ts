import { GlobalService } from '../../_services/global.service';
import { Router } from '@angular/router';


export class GlobalComponent {
    currentUser: any;
    LoggedUser: any = null;
    userToken = '';
    public showAdminTemplate = true;
    public paginationObject: any = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 20,
        pages: []
    };
    public pagination: any = {};

    constructor(
        public router: Router,
        public globalService: GlobalService
    ) {
        this.globalService.currentUser.subscribe(x => this.currentUser = x);
    }

    getPagination(pagination) {
        this.paginationObject = {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            perPage: 20,
            pages: []
        };
        this.pagination = pagination;
        this.paginationObject.currentPage = this.pagination.page;
        this.paginationObject.totalPages = this.pagination.pages;
        this.paginationObject.totalItems = this.pagination.total;
        this.paginationObject.perPage = this.pagination.limit;
        let active = false;
        if (this.pagination.pages > 6) {


            let startPage = 1;
            if (this.paginationObject.currentPage > 3) {
                this.paginationObject.pages.push({
                    value: 1,
                    active: false,
                    _value: 1
                });
                let _value = (this.paginationObject.currentPage - 3) < 1 ? 1 : (this.paginationObject.currentPage - 3);
                this.paginationObject.pages.push({
                    value: '<<',
                    active: false,
                    _value: _value
                });
                startPage = this.paginationObject.currentPage - 2;
            }
            for (let i = startPage; i < this.paginationObject.currentPage; i++) {
                this.paginationObject.pages.push({
                    value: i,
                    active: false,
                    _value: i
                });
            }
            let endPage = this.paginationObject.totalPages;
            let addLasePage = false;
            if (this.paginationObject.totalPages > (this.paginationObject.currentPage + 3)) {
                endPage = this.paginationObject.currentPage + 3;
                addLasePage = true;
            }
            this.paginationObject.pages.push({
                value: this.paginationObject.currentPage,
                active: true,
                _value: this.paginationObject.currentPage
            });
            for (let i = this.paginationObject.currentPage + 1; i < endPage; i++) {
                this.paginationObject.pages.push({
                    value: i,
                    active: false,
                    _value: i
                });
            }

            if (addLasePage) {
                let _value = (this.paginationObject.currentPage + 3) > this.paginationObject.totalPages ? this.paginationObject.totalPages : (this.paginationObject.currentPage + 3);
                this.paginationObject.pages.push({
                    value: '>>',
                    active: false,
                    _value: _value
                });
                this.paginationObject.pages.push({
                    value: this.paginationObject.totalPages,
                    active: false,
                    _value: this.paginationObject.totalPages
                });
            }else{
                this.paginationObject.pages.push({
                    value: this.paginationObject.totalPages,
                    active: false,
                    _value: this.paginationObject.totalPages
                });
            }
        } else {

            for (let i = 1; i < this.paginationObject.totalPages + 1; i++) {
                active = !!(i == this.paginationObject.currentPage);
                this.paginationObject.pages.push({
                    value: i,
                    active: active,
                    _value:i
                })
            }
        }

    }

    getCurrentState() {
        return this.router.url;
    }

    isCurrentState(value) {
        return !!(this.router.url === value || (this.router.url.search(value + '?') >= 0));
    }

    logout() {
        this.globalService.logout();
        this.router.navigate(['/login']);
    }

    showUserDetail() {
        console.log(this.getCurrentUser());
    }

    getCurrentUser() {
        this.LoggedUser = this.globalService.currentUserValue;
        return this.globalService.currentUserValue;
    }

    getCurrentTokenObject() {
        this.userToken = this.globalService.getToken();
        return this.globalService.getToken();
    }

    getToken() {
        if (this.getCurrentTokenObject()) {
            return this.getCurrentTokenObject().token;
        } else {
            return null;
        }
    }

    getCurrentUserName() {
        if (this.getCurrentUser()) {
            return this.getCurrentUser().email;
        } else {
            return null;
        }

    }

    getCurrentUserRole() {
        if (this.getCurrentUser()) {
            return this.getCurrentUser().role;
        } else {
            return null;
        }

    }

    isAdministrators() {
        if (this.getCurrentUser()) {
            return (this.getCurrentUser().role === 'admin' || this.getCurrentUser().role === 'superuser');
        } else {
            return null;
        }

    }
}
