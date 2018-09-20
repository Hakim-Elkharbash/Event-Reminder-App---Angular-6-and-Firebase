import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FiredbService } from '../firedb.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-todosetting',
  templateUrl: './todosetting.component.html',
  styleUrls: ['./todosetting.component.scss']
})
export class TodosettingComponent implements OnInit {
  model: any = {}; // to handel form components
  @ViewChild("f") accessAddForm: any;  // to have access to the form instance through the code in order to use (form functions) such as: .valid AND .reset

  todosSettings: Observable<any>;

  constructor(private todoAction: FiredbService, private router: Router, private toastr:ToastrService) {

  }
  ngOnInit() {
    this.todosSettings = this.todoAction.viewtodosettings();
    this.todosSettings
      .subscribe(result => {
     //console.log(result)
        this.model.email = result[0].email;
      })  
   
  }

  gotosomewhere(){
    this.router.navigate(['']); // route to the main view (My Events) when the user click this button.
  }




  onSubmit(){
    if (this.accessAddForm.valid){

      
      this.todoAction.updateEmail(this.model.email)
            /* this.accessAddForm.reset({
              dt:null,
              description:null,
              status:null
            })  */ // handel Reset action (Has an issue caused by form validation).

        this.toastr.success('Email has been updated.', 'Event Reminder',{
          positionClass: 'toast-bottom-right',
        }); // Show message if successed
        //this.router.navigate(['']); // route to the main view (My Events) when the user Add new event.
    }else{
        this.toastr.error('Input error.', 'Event Reminder'); // Show message if inputs error
    }
  }



}
