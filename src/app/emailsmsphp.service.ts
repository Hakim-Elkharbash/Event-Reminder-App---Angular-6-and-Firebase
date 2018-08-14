import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmailsmsphpService {

  constructor(private http: HttpClient) { 
    
  }

  sendemail(){
    return  this.http.get('https://libyapages.net/learn/email.php')
  }

  sendsms(){
    return this.http.get('https://libyapages.net/learn/sms.php');
  }

}
