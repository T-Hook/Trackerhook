import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalComponent} from "../_custom/GlobalController/global.component";
import {GlobalService} from "../_services/global.service";
import {ElectronService} from "../core/services";
import { first } from "rxjs/operators";
import { ProjectService } from "../_services/project.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends GlobalComponent implements OnInit {

    public projects = [];
    public project : any;
    error: string;
    id : number;
    loading = false;
    closeResult = '';
    public template ={
        panel:{
            header:{
                bgc:"bgc-light-green-600",
                btnColor:"btn-info",
                btnIcon:"ti-view-list"
            }
        }
    };
    constructor(public router: Router, public globalService: GlobalService,
      private modalService: NgbModal,public projectService: ProjectService) {
        super(router, globalService)
    }
    ngOnInit() {
    this.getAll();
    }
    public getAll(): void {
    if (!this.globalService.getToken || !this.globalService.currentUserValue) {
      this.router.navigate(['authentication']);
    }
    this.projectService.list()
      .pipe(first())
      .subscribe(
          data => {
              this.projects = data;
          },
          error => {
              this.error = error;
              this.loading = false;
          }
      );}
    details(id: number) {
      if (!this.globalService.getToken || !this.globalService.currentUserValue) {
        this.router.navigate(['authentication']);
      }
    this.projectService.details(id)
        .pipe(first())
        .subscribe(
            data => {
                this.project = data;
                console.log(data);
                this.getAll();
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
