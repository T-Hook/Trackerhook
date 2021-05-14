import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalComponent} from "../_custom/GlobalController/global.component";
import {GlobalService} from "../_services/global.service";
import {ElectronService} from "../core/services";
import { first } from "rxjs/operators";
import { TaskService } from "../_services/task.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends GlobalComponent implements OnInit {

    public tasks = [];
    task : any;
    error: string;
    loading = false;
    closeResult = '';
    constructor(public router: Router, public globalService: GlobalService,
      private modalService: NgbModal,public taskService: TaskService) {
        super(router, globalService)
    }

    ngOnInit() {

        if (!this.globalService.getToken || !this.globalService.currentUserValue) {
            this.router.navigate(['authentication']);
        }
        this.taskService.list()
            .pipe(first())
            .subscribe(
                data => {
                    this.tasks = data;
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );


    }
    details(id: number) {
      if (!this.globalService.getToken || !this.globalService.currentUserValue) {
        this.router.navigate(['authentication']);
      }
    this.taskService.details(id)
        .pipe(first())
        .subscribe(
            data => {
                this.task = data;
                console.log(data);

            },
            error => {
                this.error = error;
                this.loading = false;
            }
        );
    }

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
