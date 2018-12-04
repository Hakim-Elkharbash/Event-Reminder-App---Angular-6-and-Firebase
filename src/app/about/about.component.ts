import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  currentUrl:string; // a variable to hold the current url in order to enable or disable bottom bar.

  constructor(private modalService: NgbModal, private router:Router) { 
    router.events.subscribe((navUrl: NavigationEnd) => this.currentUrl = navUrl.url); // get the current url to apply disable property on bottom components IF NOT on the root view.
  }

  ngOnInit() {
  }

}
