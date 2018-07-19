import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';
//import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewtodolist',
  templateUrl: './viewtodolist.component.html',
  styleUrls: ['./viewtodolist.component.scss']
})


export class ViewtodolistComponent implements OnInit {
  todosItems: Object;

  constructor(private todoAction: FiredbService) {
    this.todosItems = this.todoAction.viewtodolist()
  //this.modalService.open("#DelModal")
  }

  ngOnInit() {
   
  }
 
  deltodoitem(itemid: any){
    this.todoAction.deltodoitem(itemid)
  }





  
}
