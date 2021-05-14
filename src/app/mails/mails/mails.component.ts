import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from "rxjs/operators";
import { GlobalComponent } from '../../_custom/GlobalController/global.component';
import { GlobalService } from '../../_services/global.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.scss']
})
export class MailsComponent extends GlobalComponent implements OnInit {
  public mail=[];
  error: string;
  loading = false;
  constructor(public router: Router, public globalService: GlobalService, public notificationservice : NotificationService) {
    super(router, globalService);
   }

  ngOnInit() {
   this.getAllMails();
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
details(id: number) {
  this.router.navigate(['/mail', id]);
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
}
