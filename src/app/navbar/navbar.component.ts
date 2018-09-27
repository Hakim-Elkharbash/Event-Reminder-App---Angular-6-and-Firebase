import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  todosItems: Observable<any[]>; //a variable to hold an Observable.
  countItems: number = 0; // a variable to hold the te number of events in order to show it on the view.
  currentUrl:string; // a variable to hold the current url in order to enable or disable bottom bar.
  constructor(private todoAction: FiredbService, private modalService: NgbModal, private toastr:ToastrService, private router:Router) {
    router.events.subscribe((navUrl: NavigationEnd) => this.currentUrl = navUrl.url); // get the current url to apply disable property on bottom components IF NOT on the root view.
   }

  ngOnInit() { // subscribe to the Observable at ngOnInit() in order to show the events number while rendering the view.
    this.todosItems = this.todoAction.viewtodolist()
     this.todosItems.subscribe(result => {
          this.countItems = result.length; // count the events which will be shown up to the right of the view.
       }); 
    
  }

  delalltodoitemsConfirmed(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === "confirmed"){
        this.todoAction.delalltodoitems()  
        this.toastr.success('All items has been deleted.', 'Event Reminder',{
          positionClass: 'toast-center-center',
        }); // Show message for (Delete All) function which will be shown down to the right of the view.
      }
    }, (error) => {
      //alert("cross click")
    });
  }



  ShearDataClick(clicked:string){ // to handel clicks (for Sorting by: Date, Content and Stutes)
    this.todoAction.ShearDataOption.next(clicked); // send type of click
  }

  ShearDataKeyPress(event:any){ // to handel typing in Search input.
    console.log(event.target.value)
    this.todoAction.ShearDataSearch.next(event.target.value);  // event.target.value: to get chars from event object
  }

}
