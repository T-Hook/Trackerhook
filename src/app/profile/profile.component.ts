import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalComponent} from "../_custom/GlobalController/global.component";
import {GlobalService} from "../_services/global.service";
import {ElectronService} from "../core/services";
import { first } from "rxjs/operators";
import { UserService } from '../_services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  extends GlobalComponent implements OnInit {
  public users = [];
  error: string;
  loading = false;
  profile : any;
  user : any={};
  passuser : any={};
  closeResult = '';
  constructor(public router: Router, public globalService: GlobalService, public userservice: UserService, private modalService: NgbModal) {
super(router, globalService)
}

ngOnInit() {

this.getuser();

}
public getuser() : void{
  if (!this.globalService.getToken || !this.globalService.currentUserValue) {
    this.router.navigate(['authentication']);
}
this.userservice.profile()
    .pipe(first())
    .subscribe(
        data => {
            this.users = data;
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
this.userservice.details(id)
    .pipe(first())
    .subscribe(
        data => {
            this.user = data;
            console.log(data);

        },
        error => {
            this.error = error;
            this.loading = false;
        }
    );
}
update(id : number) {
  this.userservice.edit(id, this.user)
  .subscribe(data => {
 console.log(data);
 this.getuser();
  }, error => console.log(error));
}


updatepassword() {
  this.userservice.updatepassword(this.passuser)
  .subscribe(data => {
 console.log(data);
 this.getuser();
  }, error => console.log(error));
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

