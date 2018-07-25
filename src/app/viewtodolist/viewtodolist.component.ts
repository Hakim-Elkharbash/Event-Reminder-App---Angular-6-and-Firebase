import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodolist.component.html',
  styleUrls: ['./viewtodolist.component.scss']
})


export class ViewtodolistComponent implements OnInit {
  todosItems: Object;
  closeResult: string;

  constructor(private todoAction: FiredbService, private modalService: NgbModal) {
    this.todosItems = this.todoAction.viewtodolist()
  }

  ngOnInit() {
   
  }
 
  deltodoitemConfirmed(content: any, itemid: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === "confirmed") 
        this.todoAction.deltodoitem(itemid)   
    }, (error) => {
      //alert("cross click")
    });
  }

  
}
