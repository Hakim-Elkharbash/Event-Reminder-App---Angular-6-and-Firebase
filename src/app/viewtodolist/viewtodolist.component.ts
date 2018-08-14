import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NgAddToCalendarService, ICalendarEvent } from '@trademe/ng-add-to-calendar';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

import { EmailsmsphpService } from '../emailsmsphp.service'
import * as moment from 'moment';




@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodolist.component.html',
  styleUrls: ['./viewtodolist.component.scss']
})


export class ViewtodolistComponent implements OnInit {
  todosItems: Observable<any>;
  closeResult: string;
  loadSpinner: boolean = true;
  //countItems: number = 0;

  //-------- Calender vars
  public googleCalendarEventUrl: SafeUrl;   
  public yahooCalendarEventUrl: SafeUrl;           
  public outlookCalendarEventUrl: SafeUrl;c 
  public outlookLiveCalendarEventUrl: SafeUrl;
  public iCalendarCalendarEventUrl: SafeUrl;
  public newEvent: ICalendarEvent;
  

  lng:number =-81.452606
  lat:number =27.962357

  constructor(private todoAction: FiredbService, private modalService: NgbModal, private toastr:ToastrService,private _addToCalendarService: NgAddToCalendarService,private _sanitizer: DomSanitizer, private smsmailService:EmailsmsphpService) {
    
  }
  


  ngOnInit() {
    //--- Call viewtodolist() function to retrive data from DB
    this.todosItems = this.todoAction.viewtodolist();

    //--- Subscribe the observable to: 
    //        1. Remove the load Spinner after grabbing the data.
    this.todosItems
    .subscribe(result => {
      //--- Hide loadSpinner
      //this.countItems = result.length; // to count the results
      this.loadSpinner = false;  // change *ngIf="loadSpinner" to false to Hide it
    })
  }



addtocal(startCal:Date,endCal:Date,descripCal){
      this.newEvent = {
        // Event title
        title: 'Event Reminder',
        // Event start date
        start: new Date(startCal),
        // Event duration (IN MINUTES)
        duration: 120,
        // If an end time is set, this will take precedence over duration (optional)
        end: new Date(endCal),
        // Event Address (optional)
        //address: '1 test street, testland',
        // Event Description (optional)
        description: descripCal
      };

      this.googleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
        this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.google, this.newEvent)
      ); 

      this.yahooCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
        this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.yahoo, this.newEvent)
      ); 

      this.outlookCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
        this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.outlook, this.newEvent)
      ); 

      this.outlookLiveCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
        this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.outlookLive, this.newEvent)
      );
          
      this.iCalendarCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
        this._addToCalendarService.getHrefFor(this._addToCalendarService.calendarType.iCalendar, this.newEvent)
      );

}


 
  deltodoitemConfirmed(content: any, itemid: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === "confirmed"){ 
        this.todoAction.deltodoitem(itemid)  
        this.toastr.success('Item has been deleted.', 'Event Reminder',{
          positionClass: 'toast-bottom-right',
        }); // Show message
      }
    }, (error) => {
      //alert("cross click")
    });
  }

  updateTodoitem(itemid: any, st: string){
    this.todoAction.updatetodoitem(itemid,st) 
    this.toastr.success('Event has been updated.', 'Event Reminder'); // Show message
 
  }

  
  sendemail(){
    this.smsmailService.sendemail()
      .subscribe(
        data => {
          console.log( data)
        },
        //cache => console.log('oops', cache) // we could use this form too to catch Errors
        error => {
         // console.log('error', error)
        }
      ); 
  }


  gpsLoc(Loc:any){
    console.log(Loc)
  }


  
}