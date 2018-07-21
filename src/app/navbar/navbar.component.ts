import { Component, OnInit } from '@angular/core';
import { FiredbService } from '../firedb.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private todoAction: FiredbService, private modalService: NgbModal) { }

  ngOnInit() {
  }



  delalltodoitemsConfirmed(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === "confirmed") 
        this.todoAction.delalltodoitems()   
    }, (error) => {
      //alert("cross click")
    });
  }


}
