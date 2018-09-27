import { 
  Component, 
  OnInit,
  Input
} from '@angular/core';

import { FiredbService } from '../firedb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { 
  NgAddToCalendarService,
  ICalendarEvent 
} from '@trademe/ng-add-to-calendar';

import { 
  SafeUrl, 
  DomSanitizer 
} from '@angular/platform-browser';

import { EmailsmsphpService } from '../emailsmsphp.service'
import * as moment from 'moment';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  stagger,
  query,
  group,
  animateChild
} from '@angular/animations';

import { isNgTemplate } from '../../../node_modules/@angular/compiler';


@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodolist.component.html',
  styleUrls: ['./viewtodolist.component.scss'],
  animations: [
    trigger('ShowHide', [
      state('show', style({
        height: '*',
        opacity: 1,
      })),
      state('hide',   style({
        opacity: '0',
        height: '0px',
      })),
      transition('show => hide', group([
        animate('600ms', style({
          opacity: 0
        })),
        animate('400ms 300ms', style({
          height: '0px'
        }))
      ])),
      transition('hide => show', group([
        animate('300ms', style({
          height: '*'
        })),
        animate('600ms 300ms', style({
          opacity: 1
        }))
      ]))
    ]),


 
    trigger('listEvents', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ]),



    trigger('explainerAnim', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0, transform: 'translateX(-40px)' }), { optional: true }),

        query(':enter', stagger('500ms', [
          animate('800ms 200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ]), { optional: true }),

        query(':enter', [
          animate(1000, style('*'))
        ], { optional: true }),

        query(':leave', stagger('500ms', [
          animate('800ms 200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ]), { optional: true }),

        
      ])
    ]),


    
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ]),
    trigger('easeInOut', [
      transition('void => *', [
          style({
              opacity: 0
          }),
          animate("1s ease-in-out", style({
              opacity: 1
          }))
      ]),
      transition('* => void', [
          style({
              opacity: 1
          }),
          animate("1s ease-in-out", style({
              opacity: 0
          }))
      ])
    ]),



    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '500ms',
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave',
        animate('5000ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])

  ]
})



export class ViewtodolistComponent implements OnInit {
  todosItems: Observable<any[]>;
  closeResult: string;
  loadSpinner: boolean = true;
  ShowMapID:number = -1; //to hold map div ID
 // itemStauts: string;
  NotificatioEmail: string;
  ShearedData: string;
  ShearedDataOption: string = "All";

  //countItems: number = 0;
  //stateName: any = {state:"hide", id:0};

  //-------- Calender vars
  public googleCalendarEventUrl: SafeUrl;   
  public yahooCalendarEventUrl: SafeUrl;           
  public outlookCalendarEventUrl: SafeUrl;c 
  public outlookLiveCalendarEventUrl: SafeUrl;
  public iCalendarCalendarEventUrl: SafeUrl;
  public newEvent: ICalendarEvent;
  

  constructor(private todoAction: FiredbService, private modalService: NgbModal, private toastr:ToastrService,private _addToCalendarService: NgAddToCalendarService,private _sanitizer: DomSanitizer, private smsmailService:EmailsmsphpService) {

  }
  


  ngOnInit() {
    //--- Call viewtodolist() function to retrive data from DB
    this.todosItems = this.todoAction.viewtodolist()
    //--- Pipe(Map) the observable to: 
    //      1. Since the observable is an array and each element of that array contain an object. We need to add new property to all the objects in order to apply animation to each element separately.
    //         Note-1: I add (openState = "show") to each object in order to manage the aninmation separately.
    //         Note-2: This observable is diffrent than the one that I rander to the user interface. this one is for additional such as animation.
    //         Note-3: It's (Important) to map the obdervable here in order to update it befor randering.
    .pipe(
      map((todosItems) => { 
        todosItems.forEach((val,index) => { 
          todosItems[index].openState = "show";  // this forEach to loop over all array elements and add new property (openState = "show")

          
          // to spicify the Event states: (Completed, Up Coming or Happening Now) according to the start and end date & time.
          if ((moment(moment(new Date(todosItems[index].Edate))).isBefore(new Date())) && (true)) {
            todosItems[index].itemStauts = "Completed"; // the event already completed.
          }else if (moment(moment(new Date(todosItems[index].Sdate))).isAfter(new Date())) {
            todosItems[index].itemStauts = "Up Coming"; // the event already completed.
          }else if (moment(new Date()).isBetween(moment(new Date(todosItems[index].Sdate)), moment(new Date(todosItems[index].Edate)))){
            todosItems[index].itemStauts = "Happening Now"; // the event already completed.
          }


          // to fix the (warning message) of Moment JS. which occure becase the date comming from DB is String NOT a Date type.. To solve this issue I used: new Date() to convert it back to Date again.
          todosItems[index].lastOp = new Date(todosItems[index].lastOp);

            // console.log(moment(todosItems[index].Sdate).toDate() , "-----", new Date());
            // console.log(moment(moment(todosItems[index].Edate).toDate()).isBefore(new Date()))
            // console.log(moment(moment(todosItems[index].Sdate).toDate()).isAfter(new Date()))
            // console.log(moment(new Date()).isBetween(moment(todosItems[index].Sdate).toDate(), moment(todosItems[index].Edate).toDate()))
            // console.log("Start: " + moment(todosItems[index].Sdate).toDate())
            // console.log("End: " +moment(todosItems[index].Edate).toDate())
        });
        return todosItems;
      })
    )

    //TO ADD NEW ELEMENT TO AN OBSERVABLE (without array)
    // .pipe(.map((todosItems) => {
    //   todosItems.openState = "show";
    //   return todosItems;
    // }))

    this.todosItems
     //--- Subscribe the observable to: 
    //      1. Remove the load Spinner after grabbing the data.
    .subscribe(result => {
    //console.log(result)
     //--- Hide loadSpinner
     //this.countItems = result.length; // to count the results
     this.loadSpinner = false;  // change *ngIf="loadSpinner" to false to Hide it
   }) 


    // To get Email notification address in order to show it on Toster message
      this.todoAction.viewtodosettings().subscribe(result => {
        //console.log(result)
        this.NotificatioEmail = result[0].email; // first element in the array which has the email address.
      })  

      // To handel shears data which come from footer bar in this case.
      this.todoAction.ShearDataBetweenComp().ShearDataOption.subscribe((data)=>{
        this.ShearedDataOption = data;
        console.log(data) 
      })

      this.todoAction.ShearDataBetweenComp().ShearDataSearch.subscribe((data)=>{
        this.ShearedData = data;
        console.log(data) 
      })
  }



//---- add to calenders
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


//----- send email notifitions  
sendemail(eventContent:any){
  this.loadSpinner = true; // show spinner while sending the notofication email.
  console.log(eventContent)
  this.smsmailService.sendemail(eventContent)
    .subscribe(
      data => {
        this.loadSpinner = false; // hide spinner after sending the notification email.
        this.toastr.success(`Email has been sent to: (${this.NotificatioEmail}). Settings: to update email.`, 'Event Reminder'); // Show message with notifation email address.
        //console.log( data)
        //console.log(JSON.parse(JSON.stringify(data)))
      },
      //cache => console.log('oops', cache) // we could use this form too to catch Errors
      error => {
       // console.log('error', error)
      }
    ); 
}


//----- handling remove items 
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


//----- handling and update item status (Active OR Cancelled)
  updateTodoitem(itemid: any, st: string){
    st = (st === 'Active' ? 'Cancelled' : 'Active');
    this.todoAction.updatetodoitem(itemid,st) 
    this.toastr.success('Event has been updated.', 'Event Reminder'); // Show message
  }



//----- handling the way to access ngFor instead of using the reference.
  trackObject(idx:number, obj:any){ // should has 2 arg (index AND object)
    //this.itemStauts = obj.key
       //console.log(obj.key)
       //console.log(idx);
      //console.log(obj.item.length) 
      //console.log(Object.keys(obj).length); 
      // return obj ? obj.key : null;    
      return obj.key; // using key (fiarbase key) instead of object reference.
                    // to optimize ngFor which (in this case) I use key (obj.key OR any other object properties) instead of reference, this very useful:
                      //     1. dealing with amount of data. 
                      //     2. accessing and do operations on object propertise such as: getting the length Event string (in this case). 
    } 



//----- show/hide event map and access long/lat info.
  gpsLocAndID(long:number, lat:number, i:number){
    this.ShowMapID = (this.ShowMapID === i ? -1 : i); // to show/hide map by ID
    console.log(long,lat)
  }

  
//---- show/hide item content
  showContent(item:any) {
    item.openState = (item.openState === 'hide' ? 'show' : 'hide'); // to show/hide event content
  }


//----- handling animation
  onAnimationEnd(ev:any){
    console.log("End", ev)
  }

  onAnimationStart(ev:any){
    console.log("Start", ev)
  }


}

 