import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FiredbService } from './firedb.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailsmsphpService {
  todosSettings: Observable<any>;
  NEmail: string;
  constructor(private http: HttpClient, private todoAction: FiredbService) { 
    this.todosSettings = this.todoAction.viewtodosettings();
    this.todosSettings
      .subscribe(result => {
     //console.log(result)
        this.NEmail = result[0].email;
      })  
  }


   
  sendemail(eventDet:any){
    return  this.http.get('https://libyapages.net/learn/email.php?eventContant='+eventDet.item+'&Sdate='+eventDet.Sdate+'&Edate='+eventDet.Edate+'&Duration='+eventDet.duration+'&Latitude='+eventDet.Latitude+'&Longitude='+eventDet.Longitude+'&flag='+eventDet.flag+'&itemStauts='+eventDet.itemStauts+'&notificationEmail='+this.NEmail)
  }

  sendsms(){
    //return this.http.get('https://libyapages.net/learn/sms.php');
  }

}
