import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private todoAction: FiredbService, private modalService: NgbModal, private toastr:ToastrService) { }

  ngOnInit() {
  }



  delalltodoitemsConfirmed(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === "confirmed"){
        this.todoAction.delalltodoitems()  
        this.toastr.success('All items has been deleted.', 'To-Do List'); // Show message 
      }
    }, (error) => {
      //alert("cross click")
    });
  }


}
