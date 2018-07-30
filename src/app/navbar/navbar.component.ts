import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  todosItems: Observable<any[]>;
  countItems: number = 0;


  constructor(private todoAction: FiredbService, private modalService: NgbModal, private toastr:ToastrService) {
    this.todosItems = this.todoAction.viewtodolist()
    this.todosItems.subscribe(result => {
      this.countItems = result.length;
    });

   }

  ngOnInit() {
  }



  delalltodoitemsConfirmed(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === "confirmed"){
        this.todoAction.delalltodoitems()  
        this.toastr.success('All items has been deleted.', 'To-Do List',{
          positionClass: 'toast-center-center',
        }); // Show message 
      }
    }, (error) => {
      //alert("cross click")
    });
  }


}
