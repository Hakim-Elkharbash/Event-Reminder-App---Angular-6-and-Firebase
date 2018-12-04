import { Component, OnInit, ViewChild } from '@angular/core';
import { FiredbService } from '../firedb.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddtodoComponent implements OnInit {
  statusList: string[] = ['Coming'];  // to set dropdown items
  model: any = {}; // to handel form components
  @ViewChild("f") accessAddForm: any;  // to have access to the form instance through the code in order to use (form functions) such as: .valid AND .reset
  Latitude: number;
  Longitude: number;
  ShowMap: boolean;
  constructor(private todoAction: FiredbService, private router: Router, private toastr:ToastrService) {

  }


  ngOnInit() {
  }


  onSubmit(){
    if (this.accessAddForm.valid){

      // date and time..
      var startTime = moment(this.model.dtrange[0], "YYYY.MM.DD HH:mm:ss a"); // convert START date&time as a momment fromat
      var endTime = moment(this.model.dtrange[1], "YYYY.MM.DD HH:mm:ss a");  // convert END date&time as a momment fromat
      var duration = moment.duration(endTime.diff(startTime)).humanize();  // calculate DURATION via moment.duration(endTime.diff(startTime)) AND fromat it as a human format using: .humanize() property
      var status:string = "Active";
      
      // event location.
      if (this.model.location == null) { this.Latitude = 0; this.Longitude = 0; }// Check if the user pick up the location or not.

      this.todoAction.addtodoitem(this.model.dtrange[0].toLocaleString(),this.model.dtrange[1].toLocaleString(),duration,this.model.description,this.Latitude,this.Longitude,status)
            /* this.accessAddForm.reset({
              dt:null,
              description:null,
              status:null
            })  */ // handel Reset action (Has an issue caused by form validation).

        this.toastr.success('Item has been added.', 'Event Reminder',{
          positionClass: 'toast-bottom-right',
        }); // Show message if successed
        //this.router.navigate(['']); // route to the main view (My Events) when the user Add new event.
    }else{
        this.toastr.error('Input error.', 'Event Reminder'); // Show message if inputs error
    }
  }


  gotosomewhere(){
    this.router.navigate(['']); // route to the main view (My Events) when the user click this button.
  }


  onDragEnd($event:any){
    this.Latitude = $event._lngLat.lat; // get the latitude
    this.Longitude = $event._lngLat.lng; // get the longitude
    this.model.location ="Latitude: " + this.Latitude + "  |  Longitude: " + this.Longitude; // to show the latitude & longitude on the form.
    //console.log($event)
    this.toastr.success('Location has been specified.', 'Event Reminder',{
      positionClass: 'toast-bottom-right',
    }); // Show message if successed
  }

  cleanGPS(){ // to clean the loaction field if user wouldn't add the locaion
    this.model.location = null
  }


}
