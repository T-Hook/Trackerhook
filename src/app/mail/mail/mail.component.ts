import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { GlobalComponent } from '../../_custom/GlobalController/global.component';
import { GlobalService } from '../../_services/global.service';
import { UserService } from '../../_services/user.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent extends GlobalComponent  implements OnInit {
  id:number;
  user:any;
  public sub: any;
  date :any;
  idS ='';
  mail :[];

  constructor(private route: ActivatedRoute,public globalService: GlobalService, public router: Router, private notificationservice :NotificationService,private userservice : UserService) {
    super(router, globalService);

  }

  ngOnInit() {
    this.route.paramMap
    .pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    )
    .subscribe(prodId => {
      this.id = prodId;});
      console.log(this.id);
    this.getAllMails();
    this.getuser();
  }

  public getuser() {
    if (!this.globalService.getToken || !this.globalService.currentUserValue) {
      this.router.navigate(['authentication']);
  }
  this.userservice.getone(this.id)
      .pipe(first())
      .subscribe(
          data => {
            this.user=data;
            console.log(data);
          },
          error => {
            console.log(error);
          }
      );
        }
  public getAllMails() {
    if (!this.globalService.getToken || !this.globalService.currentUserValue) {
      this.router.navigate(['authentication']);
  }
  this.notificationservice.listmaildisscussion(this.id)
      .pipe(first())
      .subscribe(
          data => {
           var filter = data.sort((a: any, b: any) => { return Date.parse(a.date) - Date.parse(b.date) });
             this.mail = filter;
          },
          error => {
            console.log(error);
          }
      );
        }
        refresh(){
          console.log("check function refresh")
         this.getAllMails();
        }

}
