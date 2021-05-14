import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalComponent } from "../_custom/GlobalController/global.component";
import { GlobalService } from "../_services/global.service";
import { NotificationService } from '../_services/notification.service';
import { first } from "rxjs/operators";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends GlobalComponent implements OnInit {
    public samplePagesCollapsed = true;
    public users = [];
    public notification = [];
    public mail=[];
    send: any = { };
    error: string;
    loading = false;
  closeResult = '';
    constructor(public router: Router, public globalService: GlobalService, public notificationservice : NotificationService, private modalService: NgbModal,private userservice : UserService
    ) {
        super(router, globalService);
    }

    ngOnInit() {
   this.getAllNotifications();
   this.getAllMails();
   this.getAll();
                }
                public getAll(): void {
                  this.userservice.get()
                  .subscribe(
                    data => {
                      this.users = data;
                      console.log(data);
                    },
                    error => {
                      console.log(error);
                    });
                }
public getAllNotifications() :void{
  if (!this.globalService.getToken || !this.globalService.currentUserValue) {
    this.router.navigate(['authentication']);
}
this.notificationservice.list()
    .pipe(first())
    .subscribe(
        data => {
            this.notification = data;
        },
        error => {
            this.error = error;
            this.loading = false;
        }
    );

}
public removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}
public getAllMails() :void{
  if (!this.globalService.getToken || !this.globalService.currentUserValue) {
    this.router.navigate(['authentication']);
}
this.notificationservice.listmails()
    .pipe(first())
    .subscribe(
        data => {
var uniqueArray = this.removeDuplicates(data, "idS");
            this.mail = uniqueArray;
        },
        error => {
            this.error = error;
            this.loading = false;
        }
    );

}
  details(id: number) {
    this.router.navigate(['/mail', id]);
  }
  refresh(){
    console.log("check function refresh")
   this.getAllMails();
  }

sendmail() {
  this.notificationservice.sendmail(this.send)
  .subscribe(data => {
 console.log(data);
 this.send = '';
 this.getAllMails();
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
