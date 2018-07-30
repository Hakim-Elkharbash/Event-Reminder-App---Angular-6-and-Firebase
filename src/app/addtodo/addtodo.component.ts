import { Component, OnInit, ViewChild } from '@angular/core';
import { FiredbService } from '../firedb.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddtodoComponent implements OnInit {
  statusList: string[] = ['Pending', 'Completed'];
  model: any = {};
  @ViewChild("f") accessAddForm: any;

  constructor(private todoAction: FiredbService, private router: Router, private toastr:ToastrService) {

  }


  ngOnInit() {
  }

  onSubmit(){
    if (this.accessAddForm.valid){
      this.todoAction.addtodoitem(this.model.dt.toLocaleString(),this.model.description,this.model.status)
      /* this.accessAddForm.reset({
        dt:null,
        description:null,
        status:null
      })  */
      this.toastr.success('Item has been added.', 'To-Do List'); // Show message
    }else{
      this.toastr.error('Input error.', 'To-Do List'); // Show message
    }
  }


  gotosomewhere(){
    this.router.navigate(['']);
  }

}
