import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodolist.component.html',
  styleUrls: ['./viewtodolist.component.scss']
})


export class ViewtodolistComponent implements OnInit {
  todosItems: Object;
  closeResult: string;

  constructor(private todoAction: FiredbService, private modalService: NgbModal, private toastr:ToastrService) {
    this.todosItems = this.todoAction.viewtodolist()
  }

  ngOnInit() {
   
  }
 
  deltodoitemConfirmed(content: any, itemid: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === "confirmed"){ 
        this.todoAction.deltodoitem(itemid)  
        this.toastr.success('Item has been deleted.', 'To-Do List'); // Show message
      }
    }, (error) => {
      //alert("cross click")
    });
  }

  updateTodoitem(itemid: any, st: string){
    this.todoAction.updatetodoitem(itemid,st) 
    this.toastr.success('Item has been updated.', 'To-Do List'); // Show message
 
  }

  
}
